import { CustomError } from "../../domain/errors/custo.error";
import { prisma } from "../../model/postgresql"
import { Request, Response } from "express"

export class NormalUserController {

    static handleError(error: any, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.error(error); // Winston, Console, etc
        const internalError = CustomError.internalServerError();
        return res.status(internalError.statusCode).json({ error: internalError.message });
    }

    static async MiPerfil(req: Request, res: Response) {
        try {
            const { id } = req.body.usuario

            const usuario = await prisma.usuarioNormal.findUnique({
                where: {
                    id: id
                },
                include: {
                    usuario: true
                }
            })

            if (!usuario) throw CustomError.notFound("Usuario no encontrado")

            return res.status(200).json(usuario)
        } catch (error) {
            return NormalUserController.handleError(error, res);
        }
    }

    static async ActualizarPerfil(req: Request, res: Response) {
        const { id } = req.body.usuario
        const { nombre, apellido, correo, password } = req.body
        try {

            await prisma.usuarioNormal.update({
                where: {
                    id: id
                },
                data: {
                    usuario: {
                        update: {
                            nombre: nombre,
                            apellido: apellido,
                            correo: correo,
                            password: password
                        }
                    }
                },
            })

            return res.status(200).json("Se actualizo el usuario correctamente")

        } catch (error) {
            return NormalUserController.handleError(error, res);
        }
    }

    static async agregarPropiedadFavorita(req: Request, res: Response) {
        const { id } = req.body.usuario
        const { idPropiedad } = req.body
        try {
            const [usuario, propiedad] = await Promise.all([
                prisma.usuarioNormal.findUnique({
                    where: {
                        id: id
                    }
                }),
                prisma.propiedad.findUnique({
                    where: {
                        id: idPropiedad
                    }
                })
            ])

            if (!usuario) throw CustomError.notFound("Usuario no encontrado")
            if (!propiedad) throw CustomError.notFound("Propiedad no encontrada")

            const nuevaFavorita = await prisma.propiedadFavoritos.create({
                data: {
                    idUsuario: id,
                    idPropiedad: idPropiedad
                }
            })

            return res.status(201).json(nuevaFavorita)

        } catch (error) {
            return NormalUserController.handleError(error, res);
        }
    }

    static async eliminarPropiedadFavorita(req: Request, res: Response) {
        const { id } = req.body.usuario
        const { idPropiedad } = req.body
        try {

            const favorita = await prisma.propiedadFavoritos.findFirst({
                where: {
                    idUsuario: id,
                    idPropiedad: idPropiedad
                }
            })

            if (!favorita) throw CustomError.notFound("Propiedad no es favorita")
            if (favorita.idUsuario !== id) throw CustomError.unauthorized("No tienes permiso para eliminar esta propiedad")

            const favoritaEliminada = await prisma.propiedadFavoritos.delete({
                where: {
                    id: favorita.id
                }
            })

            return res.status(200).json(favoritaEliminada)

        } catch (error) {
            return NormalUserController.handleError(error, res);
        }
    }

    static async listarPropiedadesFavoritas(req: Request, res: Response) {
        try {
            const { id } = req.body.usuario

            const favoritas = await prisma.propiedadFavoritos.findMany({
                where: {
                    idUsuario: id
                },
                include: {
                    propiedad: true
                }
            })

            return res.status(200).json(favoritas)
        } catch (error) {
            return NormalUserController.handleError(error, res);
        }
    }

}
