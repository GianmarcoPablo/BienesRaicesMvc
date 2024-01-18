import { prisma } from "../model/postgresql"
import { CustomError } from "../domain/errors/custo.error"
import { Request, Response, NextFunction } from "express"

export class CrearMiddleware {

    static async Comprobar(req: Request, res: Response, next: NextFunction) {
        const { user: usuario } = req.body

        const usuarioExiste = await prisma.usuario.findUnique({
            where: { id: usuario?.id }, select: {
                usuarioNormal: {
                    select: {
                        id: true
                    }
                },
                agenteInmobiliario: {
                    select: {
                        id: true
                    }
                }
            }
        })
        const { agenteInmobiliario, usuarioNormal } = usuarioExiste || {}
        const rolesValidos = ["AgenteInmobiliario", "Usuario"]
        if (!rolesValidos.includes(usuario?.rol)) {
            return res.status(401).json({ error: "No tiene permisos para crear" })
        }
        if (agenteInmobiliario?.id) {
            const agenteInmobiliarioExiste = await prisma.agenteInmobiliario.findFirst({
                where: { id: agenteInmobiliario.id }
            })
            if (!agenteInmobiliarioExiste) {
                return res.status(401).json({ error: "No tiene permisos para crear" })
            }

            req.body.agente = agenteInmobiliarioExiste
        }

        if (usuarioNormal?.id) {
            const usuarioNormalExiste = await prisma.usuarioNormal.findFirst({
                where: { id: usuarioNormal.id }
            })
            if (!usuarioNormalExiste) {
                return res.status(401).json({ error: "No tiene permisos para crear una casa" })
            }
            req.body.usuarioCreador = usuarioNormalExiste
        }

        next()
    }

    static handleError(error: any, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }
        console.error(error)
        const internalError = CustomError.internalServerError()
        return res.status(internalError.statusCode).json({ error: internalError.message })
    }
}