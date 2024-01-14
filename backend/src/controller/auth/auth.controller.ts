import { JwtAdapter } from "../../config/jwt.adapter"
import { HashPassword } from "../../config/hass-password"
import { prisma } from "../../model/postgresql"
import { Request, Response } from "express"

export class AuthController {
    static async login(req: Request, res: Response) {
        const { correo, password } = req.body

        if (!correo || !password) return res.status(400).json({ msg: "Todos los campos son obligatorios" })

        try {
            const usuario = await prisma.usuario.findUnique({ where: { correo } })
            if (!usuario) return res.status(400).json({ msg: "El usuario no existe" })

            const validPassword = await HashPassword.compare(password, usuario.password)
            if (!validPassword) return res.status(400).json({ msg: "La contraseña es incorrecta" })

            const token = await new JwtAdapter(process.env.JWT_SEED || "").sign({ id: usuario.id })
            return res.status(200).json({ usuario, token })
        } catch (error) {

        }
    }

    static async register(req: Request, res: Response) {
        const { nombre, correo, apellido, password, rol } = req.body
        if (!nombre || !correo || !apellido || !password || !rol) return res.status(400).json({ msg: "Todos los campos son obligatorios" })

        try {
            const existeUsuario = await prisma.usuario.findUnique({ where: { correo } })
            if (existeUsuario) return res.status(400).json({ msg: "El usuario ya esta registrado" })
            const hash = await HashPassword.hash(password)
            const rolesValidos = ["Usuario", "Agente", "Moderador", "Administrador"]
            if (!rolesValidos.includes(rol)) return res.status(400).json({ msg: "El rol no es valido" })
            const usuario = await prisma.usuario.create({ data: { nombre, correo, apellido, password: hash, rol } })

            if (usuario.rol === "Usuario") {
                await prisma.usuarioNormal.create({
                    data: {
                        idUsuario: usuario.id
                    }
                })
            }

            if (usuario.rol === "Agente") {
                await prisma.agenteInmobiliario.create({
                    data: {
                        calificacion: 0,
                        especialidad: "",
                        experiencia: 4,
                        numeroContacto: "",
                        ubicacion: "",
                        idUsuario: usuario.id,
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

            const token = await new JwtAdapter(process.env.JWT_SEED || "").sign({ id: usuario.id })
            return res.status(200).json({ usuario, token })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Error en el servidor" })
        }
    }
}