import { CustomError } from "../../domain/errors/custo.error";
import { prisma } from "../../model/postgresql"
import { Request, Response } from "express"

interface PaginacionParams {
    limit?: number;
    page?: number;
}

export class PropiedadController {

    static handleError(error: any, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }
        console.log(error) // Winston, Console, etc
        return res.status(500).json({ error: "Internal Server Error" })
    }

    static async getPropiedades(req: Request, res: Response) {
        const { agente } = req.body;
        const { limit = 5, page = 1 } = req.query as PaginacionParams;
        const offset = (page - 1) * limit;
        try {
            const [propiedades, totalPropiedades] = await Promise.all([
                prisma.propiedad.findMany({
                    where: { idAgente: agente.id },
                    include: {
                        agente: true,
                        apartamento: true,
                        casa: true,
                    },
                    skip: offset,
                    take: Number(limit),
                }),
                prisma.propiedad.count({ where: { idAgente: agente.id } })
            ])

            return res.status(200).json({
                propiedades,
                totalPropiedades,
                nextPage: "http://localhost:4000/api/v1/propiedades?page=" + (Number(page) + 1) + "&limit=" + limit,
                prevPage: page > 1 ? "http://localhost:4000/api/v1/propiedades?page=" + (Number(page) - 1) + "&limit=" + limit : "No hay pagina anterior"
            })
        } catch (error) {
            return PropiedadController.handleError(error, res)
        }
    }

    static async getPropiedad(req: Request, res: Response) {
        const { id } = req.params
        const { agente } = req.body

        try {
            const propiedad = await prisma.propiedad.findUnique({
                where: { id },
                include: {
                    agente: true,
                    apartamento: true,
                    casa: true,
                }
            })

            if (!propiedad) throw CustomError.notFound("La propiedad no existe")

            if (propiedad.idAgente !== agente.id) throw CustomError.unauthorized("No tienes permiso para ver esta propiedad")

            return res.status(200).json({ propiedad })
        } catch (error) {
            return PropiedadController.handleError(error, res)
        }
    }

    static async createPropiedad(req: Request, res: Response) {
        const { tipo, ubicacion, precio, size, habitaciones, bathrooms, descripcion, estado, fotos, calificacion, jardin, numPisos, parqueadero, piscina, seguridad, amoblado, ascensor } = req.body
        const { agente } = req.body
        try {
            if (!tipo || !ubicacion || !precio || !size || !habitaciones || !bathrooms || !descripcion || !estado || !calificacion) throw CustomError.badRequest("Todos los campos son obligatorios")
            const propiedad = await prisma.propiedad.create({
                data: {
                    tipo, ubicacion, precio, size, habitaciones, bathrooms, descripcion, estado, fotos, calificacion, idAgente: agente.id,
                }
            })

            if (propiedad.tipo === "Casa") {
                await prisma.casa.create({
                    data: {
                        idPropiedad: propiedad.id,
                        jardin,
                        numPisos,
                        parqueadero,
                        piscina,
                        seguridad,
                    }
                })
            }

            if (propiedad.tipo === "Apartamento") {
                await prisma.apartamento.create({
                    data: {
                        idPropiedad: propiedad.id,
                        amoblado,
                        ascensor,
                        parqueadero,
                        seguridad,
                        numPisos
                    }
                })
            }

            return res.status(200).json(propiedad)

        } catch (error) {
            return PropiedadController.handleError(error, res)
        }
    }

    static async updatePropiedad(req: Request, res: Response) {
        const { id } = req.params
        const { tipo, ubicacion, precio, size, habitaciones, bathrooms, descripcion, estado, fotos, calificacion, jardin, numPisos, parqueadero, piscina, seguridad, amoblado, ascensor, agente } = req.body

        try {
            const propiedad = await prisma.propiedad.findUnique({ where: { id } })

            if (!propiedad) throw CustomError.notFound("La propiedad no existe")

            if (propiedad.idAgente !== agente.id) throw CustomError.badRequest("No tienes permiso para editar esta propiedad")
            const propiedadActualizada = await prisma.propiedad.update({
                where: { id },
                data: {
                    tipo, ubicacion, precio, size, habitaciones, bathrooms, descripcion, estado, fotos, calificacion,
                }
            })

            if (propiedadActualizada.tipo === "Casa") {
                await prisma.casa.update({
                    where: { idPropiedad: propiedad.id },
                    data: {
                        jardin,
                        numPisos,
                        parqueadero,
                        piscina,
                        seguridad,
                    }
                })
            }

            if (propiedadActualizada.tipo === "Apartamento") {
                await prisma.apartamento.update({
                    where: { idPropiedad: propiedad.id },
                    data: {
                        amoblado,
                        ascensor,
                        parqueadero,
                        seguridad,
                        numPisos
                    }
                })
            }

            return res.status(200).json(propiedadActualizada)
        } catch (error) {
            return PropiedadController.handleError(error, res)
        }
    }

    static async deletePropiedad(req: Request, res: Response) {
        const { id } = req.params
        const { agente } = req.body

        try {
            const propiedad = await prisma.propiedad.findUnique({ where: { id } })

            if (!propiedad) throw CustomError.notFound("La propiedad no existe")

            if (propiedad.idAgente !== agente.id) throw CustomError.unauthorized("No tienes permiso para eliminar esta propiedad")

            await prisma.propiedad.delete({ where: { id } })

            return res.status(200).json({ msg: "Propiedad eliminada" })
        } catch (error) {
            return PropiedadController.handleError(error, res)
        }
    }
}
