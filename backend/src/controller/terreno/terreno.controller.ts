import { prisma } from "../../model/postgresql"
import { CustomError } from "../../domain/errors/custo.error";
import { Request, Response } from "express"
import { CrearTerrenoDTO } from "../../domain/dtos/crear-terreno.dto";

interface PaginacionParams {
    limit?: number;
    page?: number;
}

export class TerrenoController {

    static handleError(error: any, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ msg: error.message })
        }
        console.log(error)
        return res.status(500).json({ msg: "Error en el servidor" })
    }

    static async getTerrenos(req: Request, res: Response) { }

    static async getTerreno(req: Request, res: Response) { }

    static async createTerreno(req: Request, res: Response) {
        const { agente, usuarioCreador } = req.body
        try {
            const [error, terreno] = CrearTerrenoDTO.create(req.body)
            if (error) throw CustomError.badRequest(error)
            if (!terreno) throw CustomError.badRequest("Error al crear el terreno")

            const { area, precio, superficie, tipoSuelo, direccion, fotos, descripcion, extras } = terreno

            let terrenoCreado: any;

            if (agente) {
                terrenoCreado = await prisma.terreno.create({
                    data: {
                        area,
                        precio,
                        superficie,
                        tipoSuelo,
                        direccion,
                        fotos,
                        descripcion,
                        extras,
                        agente: {
                            connect: {
                                id: agente?.id
                            }
                        }
                    }
                })
            } else {
                terrenoCreado = await prisma.terreno.create({
                    data: {
                        area,
                        precio,
                        superficie,
                        tipoSuelo,
                        direccion,
                        fotos,
                        descripcion,
                        extras,
                        creador: {
                            connect: {
                                id: usuarioCreador?.id
                            }
                        }
                    }
                })
            }

            return res.status(201).json(terrenoCreado)
        } catch (error) {
            return TerrenoController.handleError(error, res)
        }
    }

    static async updateTerreno(req: Request, res: Response) { }

    static async deleteTerreno(req: Request, res: Response) { }

}
