import { Request, Response } from "express"
import { CustomError } from "../../domain/errors/custo.error"
import { prisma } from "../../model/postgresql"
import { CrearLocalDto } from "../../domain/dtos/crear-local.dto"

interface PaginacionParams {
    limit?: number;
    page?: number;
}

export class LocalController {
    static handleError(error: any, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ msg: error.message })
        }
        console.log(error)
        return res.status(500).json({ msg: "Error en el servidor" })
    }

    static async getLocales(req: Request, res: Response) {
        const { agente, usuarioCreador } = req.body
        const { limit = 5, page = 1 } = req.query as PaginacionParams
        const offset = (page - 1) * limit
        try {
            const [locales, totalLocales] = await Promise.all([
                prisma.local.findMany({
                    where: { idAgente: agente?.id, idCreador: usuarioCreador?.id },
                    take: limit,
                    skip: offset,
                    include: {
                        agente: true,
                        creador: true
                    }
                }),
                prisma.local.count({ where: { idAgente: agente?.id, idCreador: usuarioCreador?.id } })
            ])

            return res.status(200).json({
                locales,
                totalLocales,
                nextPage: "http://localhost:4000/api/v1/locales?page=" + (Number(page) + 1) + "&limit=" + limit,
                prevPage: page > 1 ? "http://localhost:4000/api/v1/locales?page=" + (Number(page) - 1) + "&limit=" + limit : "No hay pagina anterior"
            })
        } catch (error) {
            return LocalController.handleError(error, res)
        }
    }

    static async getLocal(req: Request, res: Response) { }

    static async createLocal(req: Request, res: Response) {
        const { agente, usuarioCreador } = req.body
        const [error, local] = CrearLocalDto.create(req.body)
        try {
            if (error) throw CustomError.badRequest("Error en los datos enviados")
            if (!local) throw CustomError.badRequest("Error en los datos enviados")

            let localCreado: any;

            if (agente) {
                localCreado = await prisma.local.create({
                    data: {
                        ...local,
                        agente: {
                            connect: {
                                id: agente.id
                            }
                        }
                    }
                })
            } else if (usuarioCreador) {
                localCreado = await prisma.local.create({
                    data: {
                        ...local,
                        creador: {
                            connect: {
                                id: usuarioCreador.id
                            }
                        }
                    }
                })
            } else {
                throw CustomError.badRequest("Error en los datos enviados")
            }

            return res.status(201).json(localCreado)
        } catch (error) {
            return LocalController.handleError(error, res)
        }
    }

    static async updateLocal(req: Request, res: Response) { }

    static async deleteLocal(req: Request, res: Response) { }
}