import { CustomError } from "../../domain/errors/custo.error";
import { prisma } from "../../model/postgresql"
import { Request, Response } from "express"
import { CrearCasaDto } from "../../domain/dtos/crear-casa.dto";
import { TipoPropiedad, Antiguedad, Estado, TipoTransaccion } from "../../domain/dtos/crear-casa.dto";
import multer from "multer"
import path from "path"

interface PaginacionParams {
    limit?: number;
    page?: number;
}

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads'), // Ruta donde se guardarán las imágenes
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileNameWithoutExtension = file.originalname.split('.')[0]; // Obtener el nombre sin la extensión
        const finalFileName = `${fileNameWithoutExtension}-${uniqueSuffix}${path.extname(file.originalname)}`;
        cb(null, finalFileName);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limitar tamaño de archivo a 5MB (puedes ajustarlo)
    fileFilter: (req, file, cb) => {
        // Agregar lógica para filtrar tipos de archivos si es necesario
        cb(null, true);
    },
});


export class CasaController {

    static handleError(error: any, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ msg: error.message })
        }
        console.log(error)
        return res.status(500).json({ msg: "Error en el servidor" })
    }

    static async getCasas(req: Request, res: Response) {
        const { agente, usuarioCreador } = req.body
        const { limit = 5, page = 1 } = req.query as PaginacionParams
        const offset = (page - 1) * limit
        try {
            const [casas, totalCasas] = await Promise.all([
                prisma.casa.findMany({
                    where: { idAgente: agente?.id, idCreador: usuarioCreador?.id },
                    take: limit,
                    skip: offset,
                    include: {
                        agente: true,
                        creador: true
                    }
                }),
                prisma.casa.count({ where: { idAgente: agente?.id, idCreador: usuarioCreador?.id } })
            ])

            return res.status(200).json({
                casas,
                totalCasas,
                nextPage: "http://localhost:4000/api/v1/casas?page=" + (Number(page) + 1) + "&limit=" + limit,
                prevPage: page > 1 ? "http://localhost:4000/api/v1/casas?page=" + (Number(page) - 1) + "&limit=" + limit : "No hay pagina anterior"
            })
        } catch (error) {
            return CasaController.handleError(error, res)
        }
    }

    static async getCasa(req: Request, res: Response) { }

    static async createCasa(req: Request, res: Response) {
        const { agente, usuarioCreador } = req.body
        const [error, casa] = CrearCasaDto.create(req.body)
        try {
            if (error) throw CustomError.badRequest(error)
            if (!casa) throw CustomError.badRequest("No se pudo crear la casa")
            // const { tipo, ubicacion, precio, superficie, habitaciones, bathrooms, estado, antiguedad, fotos, tipoTransaccion, fechaPublicacion, descripcion, ascensor, seguridad, piscina, cocina, parqueadero, jardin, amoblado, balcon, terraza, calefaccion, numPisos } = casa
            let casaCreada: any

            if (agente) {
                casaCreada = await prisma.casa.create({
                    data: {
                        ...casa,
                        agente: {
                            connect: {
                                id: agente.id
                            }
                        },
                    }
                })
            } else {
                casaCreada = await prisma.casa.create({
                    data: {
                        ...casa,
                        creador: {
                            connect: {
                                id: usuarioCreador.id
                            }
                        },
                    }
                })
            }

            return res.status(201).json({ msg: "Casa creada", casaCreada })
        } catch (error) {
            return CasaController.handleError(error, res)
        }
    }

    static async updateCasa(req: Request, res: Response) { }

    static async deleteCasa(req: Request, res: Response) { }

}
