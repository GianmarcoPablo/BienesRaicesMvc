import { Request, Response } from "express";
import { prisma } from "../../model/postgresql"
import { CustomError } from "../../domain/errors/custo.error";

export class AgenteController {
    static handleError(error: any, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }
        console.error(error)
        const internalError = CustomError.internalServerError()
        return res.status(internalError.statusCode).json({ error: internalError.message })
    }

    static async MiPerfil(req: Request, res: Response) {
        try {
            const { id } = req.body.usuario

            const usuario = await prisma.agenteInmobiliario.findUnique({
                where: {
                    id: id
                },
                include: {
                    usuario: true
                }
            })

            if (!usuario) throw CustomError.notFound("Usuario no encontrado")

            return res.status(200).json(usuario)
        } catch (error) {
            return AgenteController.handleError(error, res)
        }
    }

    static async ActualizarPerfil(req: Request, res: Response) {
        const { id } = req.body.usuario
        const { nombre, apellido, correo, password, numeroContacto, calificacion, ubicacion, especialidad, experiencia, web } = req.body

        try {
            await prisma.agenteInmobiliario.update({
                where: {
                    id
                },
                data: {
                    usuario: {
                        update: {
                            nombre,
                            apellido,
                            correo,
                            password,
                            numeroContacto,
                        }
                    },
                    calificacion,
                    web,
                    ubicacion,
                    especialidad,
                    experiencia
                },
            })

            return res.status(200).json("Se actualizo el usuario correctamente")
        } catch (error) {
            return AgenteController.handleError(error, res)
        }
    }
}