import { Request, Response, NextFunction } from "express";
import { CustomError } from "../domain/errors/custo.error";
import { prisma } from "../model/postgresql"

export class AgenteMiddleware {

    static handleError(error: any, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }
        console.error(error)
        const internalError = CustomError.internalServerError()
        return res.status(internalError.statusCode).json({ error: internalError.message })
    }

    static async tienePermisos(req: Request, res: Response, next: NextFunction) {
        const { user } = req.body
        try {
            if (user.rol !== "AgenteInmobiliario") throw CustomError.unauthorized("No tiene permisos para realizar esta acción")

            const usuario = await prisma.agenteInmobiliario.findUnique({
                where: {
                    idUsuario: user.id
                }
            })

            if (!usuario) throw CustomError.notFound("Usuario no encontrado")

            req.body.usuario = usuario

            next()
        } catch (error) {
            return AgenteMiddleware.handleError(error, res)
        }
    }
}