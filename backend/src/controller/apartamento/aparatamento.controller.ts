import { CustomError } from "../../domain/errors/custo.error";
import { prisma } from "../../model/postgresql"
import { Request, Response } from "express"
import { CrearApartamentoDto } from "../../domain/dtos/crear-apartamento.dto";
import { TipoPropiedad, Antiguedad, Estado, TipoTransaccion } from "../../domain/dtos/crear-casa.dto";

interface PaginacionParams {
    limit?: number;
    page?: number;
}


export class ApartamentoController {

    static handleError(error: any, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }
        console.log(error) // Winston, Console, etc
        return res.status(500).json({ error: "Internal Server Error" })
    }


    static async getApartamentos(req: Request, res: Response) {
        const { agente, usuarioCreador } = req.body
        const { limit = 5, page = 1 } = req.query as PaginacionParams
        const offset = (page - 1) * limit
        try {
            const [apartamentos, totalApartamentos] = await Promise.all([
                prisma.apartamento.findMany({
                    where: { idAgente: agente?.id, idCreador: usuarioCreador?.id },
                    take: limit,
                    skip: offset,
                    include: {
                        agente: true,
                        creador: true
                    }
                }),
                prisma.apartamento.count({ where: { idAgente: agente?.id, idCreador: usuarioCreador?.id } })
            ])

            return res.status(200).json({
                apartamentos,
                totalApartamentos,
                nextPage: "http://localhost:4000/api/v1/apartamentos?page=" + (Number(page) + 1) + "&limit=" + limit,
                prevPage: page > 1 ? "http://localhost:4000/api/v1/apartamentos?page=" + (Number(page) - 1) + "&limit=" + limit : "No hay pagina anterior"
            })
        } catch (error) {
            return ApartamentoController.handleError(error, res)
        }
    }

    static async getApartamento(req: Request, res: Response) {
        const {id} = req.params
    }

    static async createApartamento(req: Request, res: Response) {
        const { usuarioCreador, agente } = req.body
        const [error, apartamento] = CrearApartamentoDto.create(req.body)
        try {
            if (error) throw CustomError.badRequest(error)
            if (!apartamento) throw CustomError.badRequest("No se pudo crear el apartamento")
            const { tipo, ubicacion, precio, superficie, habitaciones, bathrooms, estado, antiguedad, fotos, tipoTransaccion, fechaPublicacion, descripcion, ascensor, seguridad, piscina, cocina, parqueadero, jardin, amoblado, balcon, terraza, calefaccion, numPisos } = apartamento || {}


            let apartamentoCreado: any
            if (agente) {
                apartamentoCreado = await prisma.apartamento.create({
                    data: {
                        tipo: tipo as TipoPropiedad,
                        ubicacion,
                        precio,
                        superficie,
                        habitaciones,
                        bathrooms,
                        estado: estado as Estado,
                        antiguedad: antiguedad as Antiguedad,
                        fotos,
                        tipoTransaccion: tipoTransaccion as TipoTransaccion,
                        fechaPublicacion,
                        descripcion,
                        ascensor,
                        seguridad,
                        piscina,
                        cocina,
                        parqueadero,
                        jardin,
                        amoblado,
                        balcon,
                        terraza,
                        calefaccion,
                        numPisos,
                        agente: {
                            connect: {
                                id: agente.id
                            }
                        },
                    }
                })
            } else {
                apartamentoCreado = await prisma.apartamento.create({
                    data: {
                        tipo: tipo as TipoPropiedad,
                        ubicacion,
                        precio,
                        superficie,
                        habitaciones,
                        bathrooms,
                        estado: estado as Estado,
                        antiguedad: antiguedad as Antiguedad,
                        fotos,
                        tipoTransaccion: tipoTransaccion as TipoTransaccion,
                        fechaPublicacion,
                        descripcion,
                        ascensor,
                        seguridad,
                        piscina,
                        cocina,
                        parqueadero,
                        jardin,
                        amoblado,
                        balcon,
                        terraza,
                        calefaccion,
                        numPisos,
                        creador: {
                            connect: {
                                id: usuarioCreador.id
                            }
                        },
                    }

                })
            }

            return res.status(201).json(apartamentoCreado)
        } catch (error) {
            return ApartamentoController.handleError(error, res)
        }
    }

    static async updateApartamento(req: Request, res: Response) {
    }

    static async deleteApartamento(req: Request, res: Response) {
    }


}
