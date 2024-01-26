import { JwtAdapter } from "../../config/jwt.adapter"
import { HashPassword } from "../../config/hass-password"
import { CustomError } from "../../domain/errors/custo.error"
import { prisma } from "../../model/postgresql"
import { Request, Response } from "express"
import { RegisterUserDto } from "../../domain/dtos/register-user.dto"
import { RolUsuario } from "../../domain/dtos/register-user.dto"


export class AuthController {

    static handleError(error: any, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ msg: error.message })
        }
        console.log(error)
        return res.status(500).json({ msg: "Error en el servidor" })
    }

    static async login(req: Request, res: Response) {
        const { correo, password } = req.body
        try {
            if (!correo || !password) throw CustomError.badRequest("Todos los campos son obligatorios")
            const usuario = await prisma.usuario.findUnique({
                where: { correo },
                include: {
                    usuarioNormal: true,
                    agenteInmobiliario: true,
                    administrador: true,
                    moderador: true
                }
            })
            if (!usuario) throw CustomError.notFound("El usuario no existe")

            const validPassword = await HashPassword.compare(password, usuario.password)
            if (!validPassword) throw CustomError.unauthorized("La contraseña es incorrecta")

            const token = await new JwtAdapter(process.env.JWT_SEED || "").generarToken({ id: usuario.id })
            return res.status(200).json({ usuario, token })
        } catch (error) {
            return AuthController.handleError(error, res)
        }
    }

    static async register(req: Request, res: Response) {
        try {
            const [error, usuarioDto] = RegisterUserDto.create(req.body)
            if (!usuarioDto) return res.status(400).json({ error })
            const { nombre, correo, apellido, password, rol, numeroContacto, experiencia, especialidad, ubicacion, web } = usuarioDto
            if (error) throw CustomError.badRequest(error)
            const existeUsuario = await prisma.usuario.findUnique({ where: { correo } })
            if (existeUsuario) throw CustomError.conflict("El usuario ya existe")
            const hash = await HashPassword.hash(password)
            const rolesValidos = ["Usuario", "AgenteInmobiliario", "Moderador", "Administrador"]
            if (!rolesValidos.includes(rol)) {
                throw CustomError.badRequest("El rol no es válido")
            }
            const usuario = await prisma.usuario.create({
                data: {
                    nombre: nombre,
                    correo,
                    apellido,
                    password: hash,
                    numeroContacto,
                    rol: rol as RolUsuario
                }
            })

            if (usuario.rol === "Usuario") {
                await prisma.usuarioNormal.create({
                    data: {
                        idUsuario: usuario.id,
                    }
                })
            }

            if (usuario.rol === "AgenteInmobiliario") {
                if (!experiencia || !especialidad || !ubicacion || !numeroContacto)
                    await prisma.agenteInmobiliario.create({
                        data: {
                            idUsuario: usuario.id,
                            experiencia: experiencia || 0,
                            especialidad: especialidad || "",
                            ubicacion: ubicacion || "",
                            web: web || ""
                        }
                    })
            }
            if (usuario.rol === "Moderador") {
                await prisma.moderador.create({
                    data: {
                        idUsuario: usuario.id
                    }
                })
            }
            if (usuario.rol === "Administrador") {
                await prisma.administrador.create({
                    data: {
                        idUsuario: usuario.id
                    }
                })
            }

            const token = await new JwtAdapter(process.env.JWT_SEED || "").generarToken({ id: usuario.id })
            return res.status(200).json({ usuario, token })
        } catch (error) {
            return AuthController.handleError(error, res)
        }
    }
}