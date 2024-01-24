import fileUpload from 'express-fileupload';
import { CustomError } from "../../domain/errors/custo.error";
import { prisma } from "../../model/postgresql"
import { Request, Response } from "express"
import { CrearCasaDto } from "../../domain/dtos/crear-casa.dto";
import { TipoPropiedad, Antiguedad, Estado, TipoTransaccion } from "../../domain/dtos/crear-casa.dto";
import { v4 as uuidv4 } from 'uuid'; // Para generar nombres de archivo únicos
import path from "path";
import * as fs from 'fs/promises';

interface PaginacionParams {
    limit?: number;
    page?: number;
}


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
        const { limit = 6, page = 1 } = req.query as PaginacionParams
        const limitNumber = Number(limit)
        const offset = (page - 1) * limit
        try {
            const [casas, totalCasas] = await Promise.all([
                prisma.casa.findMany({
                    where: { idAgente: agente?.id, idCreador: usuarioCreador?.id },
                    take: limitNumber,
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
                nextPage: "/casa?page=" + (Number(page) + 1) + "&limit=" + limit,
                prevPage: page > 1 ? "/casa?page=" + (Number(page) - 1) + "&limit=" + limit : "No hay pagina anterior"
            })
        } catch (error) {
            return CasaController.handleError(error, res)
        }
    }


    static async getCasa(req: Request, res: Response) {
        const { id } = req.params;
        const { agente, usuarioCreador } = req.body;


        try {
            const casa = await prisma.casa.findUnique({
                where: {
                    id,
                },
            });
            if (!casa) throw CustomError.notFound("No se encontro la casa");

            if (casa.idAgente !== agente?.id && casa.idCreador !== usuarioCreador?.id) throw CustomError.unauthorized("No tienes permiso para ver esta casa");
            return res.status(200).json(casa);
        } catch (error) {
            return CasaController.handleError(error, res);
        }
    }

    static async createCasa(req: Request, res: Response) {
        const { agente, usuarioCreador, precio, superficie, habitaciones, bathrooms, numPisos, ascensor, seguridad, piscina, cocina, parqueadero, jardin, amoblado, balcon, terraza, calefaccion } = req.body;
        console.log("Desde aca")
        console.log(req?.files && req.files['images[]'])
        try {
            const { agente, usuarioCreador } = req.body;
            const [error, casaDto] = CrearCasaDto.create(req.body);
            const precioFloat = parseFloat(precio);
            const superficieInt = parseInt(superficie);
            const habitacionesInt = parseInt(habitaciones);
            const bathroomsInt = parseInt(bathrooms);
            const numPisosInt = parseInt(numPisos);
            const ascensorBool = ascensor === 'true';
            const seguridadBool = seguridad === 'true';
            const piscinaBool = piscina === 'true';
            const cocinaBool = cocina === 'true';
            const parqueaderoBool = parqueadero === 'true';
            const jardinBool = jardin === 'true';
            const amobladoBool = amoblado === 'true';
            const balconBool = balcon === 'true';
            const terrazaBool = terraza === 'true';
            const calefaccionBool = calefaccion === 'true';

            if (!casaDto) throw CustomError.badRequest("No se pudo crear la casa");
            if (error) throw CustomError.badRequest(error);

            if (!req.files) {
                return res.status(400).send('No files were uploaded.');
            }

            const files = req.files['images[]'] as fileUpload.UploadedFile[];
            const imageNames = [] as string[];

            for (const image of files) {
                const imageName = uuidv4() + path.extname(image.name);
                console.log(imageName)
                await image.mv(`./public/${imageName}`);
                imageNames.push(imageName);
            }

            let casaCreada: any;
            if (agente) {
                casaCreada = await prisma.casa.create({
                    data: {
                        ...casaDto,
                        precio: precioFloat,
                        superficie: superficieInt,
                        habitaciones: habitacionesInt,
                        bathrooms: bathroomsInt,
                        numPisos: numPisosInt,
                        ascensor: ascensorBool,
                        seguridad: seguridadBool,
                        piscina: piscinaBool,
                        cocina: cocinaBool,
                        parqueadero: parqueaderoBool,
                        jardin: jardinBool,
                        amoblado: amobladoBool,
                        balcon: balconBool,
                        terraza: terrazaBool,
                        calefaccion: calefaccionBool,
                        fotos: {
                            set: imageNames
                        },
                        agente: {
                            connect: {
                                id: agente.id
                            }
                        }
                    },
                });
            } else {
                casaCreada = await prisma.casa.create({
                    data: {
                        creador: {
                            connect: {
                                id: usuarioCreador.id,
                            },
                        },
                        ...casaDto,
                        precio: precioFloat,
                        superficie: superficieInt,
                        habitaciones: habitacionesInt,
                        bathrooms: bathroomsInt,
                        numPisos: numPisosInt,
                        ascensor: ascensorBool,
                        seguridad: seguridadBool,
                        piscina: piscinaBool,
                        cocina: cocinaBool,
                        parqueadero: parqueaderoBool,
                        jardin: jardinBool,
                        amoblado: amobladoBool,
                        balcon: balconBool,
                        terraza: terrazaBool,
                        calefaccion: calefaccionBool,
                        fotos: {
                            set: imageNames
                        },
                    },
                });
            }


            return res.status(201).json({ msg: "Casa creada", casaCreada });
        } catch (error) {
            return CasaController.handleError(error, res);
        }
    }


    static async updateCasa(req: Request, res: Response) { }

    static async deleteCasa(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const casa = await prisma.casa.findUnique({ where: { id } });
            if (!casa) throw CustomError.notFound("No se encontro la casa");

            const imageNames = casa.fotos;

            await prisma.casa.delete({ where: { id } });

            if (imageNames && imageNames.length > 0) {
                for (const imageName of imageNames) {
                    const imagePath = `./public/${imageName}`;
                    try {
                        await fs.unlink(imagePath);
                        console.log(`Deleted file ${imagePath}`);
                    } catch (unlinkError) {
                        console.log(`Error deleting file ${imagePath}`);
                    }
                }
            }

            return res.status(200).json({ msg: "Casa eliminada" });
        } catch (error) {
            return CasaController.handleError(error, res);
        }
    }

}
