import { prisma } from "../../model/postgresql"
import { Request, Response } from "express"

export class PropiedadController {
    static async getPropiedades(req: Request, res: Response) {

    }

    static async getPropiedad(req: Request, res: Response) {

    }

    static async createPropiedad(req: Request, res: Response) {
        const { tipo, ubicacion, precio, size, habitaciones, bathrooms, descripcion, estado, fotos, calificacion } = req.body
        const { agente } = req.body

        if (!tipo || !ubicacion || !precio || !size || !habitaciones || !bathrooms || !descripcion || !estado || !fotos || !calificacion) return res.status(400).json({ msg: "Todos los campos son obligatorios" })

        try {
            const propiedad = await prisma.propiedad.create({
                data: {
                    tipo, ubicacion, precio, size, habitaciones, bathrooms, descripcion, estado, fotos, calificacion, idAgente: agente.id,
                }
            })
            return res.status(200).json({ propiedad })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Error interno" })
        }
    }

    static async updatePropiedad(req: Request, res: Response) {

    }

    static async deletePropiedad(req: Request, res: Response) {
        const { id } = req.params
        try {
            const propiedad = await prisma.propiedad.delete({ where: { id } })
            return res.status(200).json({ propiedad })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Error interno" })
        }
    }
}
