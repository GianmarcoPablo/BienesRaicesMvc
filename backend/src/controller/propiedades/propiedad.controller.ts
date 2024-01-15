import { prisma } from "../../model/postgresql"
import { Request, Response } from "express"

interface PaginacionParams {
    limit?: number;
    page?: number;
}

export class PropiedadController {
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
            console.log(error)
            return res.status(500).json({ msg: "Error interno" })
        }
    }

    static async getPropiedad(req: Request, res: Response) {
        const { id } = req.params
        const { agente } = req.body

        console.log(agente)
        console.log(id)

        try {
            const propiedad = await prisma.propiedad.findUnique({
                where: { id },
                include: {
                    agente: true,
                    apartamento: true,
                    casa: true,
                }
            })

            if (!propiedad) return res.status(400).json({ msg: "La propiedad no existe" })

            if (propiedad.idAgente !== agente.id) return res.status(400).json({ msg: "No tienes permiso para ver esta propiedad" })

            return res.status(200).json({ propiedad })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Error interno" })
        }
    }

    static async createPropiedad(req: Request, res: Response) {
        const { tipo, ubicacion, precio, size, habitaciones, bathrooms, descripcion, estado, fotos, calificacion, jardin, numPisos, parqueadero, piscina, seguridad, amoblado, ascensor } = req.body
        const { agente } = req.body

        if (!tipo || !ubicacion || !precio || !size || !habitaciones || !bathrooms || !descripcion || !estado || !calificacion) return res.status(400).json({ msg: "Todos los campos son obligatorios" })
        try {
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
            console.log(error)
            return res.status(500).json({ msg: "Error interno" })
        }
    }

    static async updatePropiedad(req: Request, res: Response) {
        const { id } = req.params
        const { tipo, ubicacion, precio, size, habitaciones, bathrooms, descripcion, estado, fotos, calificacion, jardin, numPisos, parqueadero, piscina, seguridad, amoblado, ascensor } = req.body

        try {
            const propiedad = await prisma.propiedad.update({
                where: { id },
                data: {
                    tipo, ubicacion, precio, size, habitaciones, bathrooms, descripcion, estado, fotos, calificacion,
                }
            })

            if (propiedad.tipo === "Casa") {
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

            if (propiedad.tipo === "Apartamento") {
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

            return res.status(200).json(propiedad)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Error interno" })
        }
    }

    static async deletePropiedad(req: Request, res: Response) {
        const { id } = req.params
        const { agente } = req.body

        try {
            const propiedad = await prisma.propiedad.findUnique({ where: { id } })

            if (!propiedad) return res.status(400).json({ msg: "La propiedad no existe" })

            if (propiedad.idAgente !== agente.id) return res.status(400).json({ msg: "No tienes permiso para eliminar esta propiedad" })

            await prisma.propiedad.delete({ where: { id } })

            return res.status(200).json({ msg: "Propiedad eliminada" })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Error interno" })
        }
    }
}
