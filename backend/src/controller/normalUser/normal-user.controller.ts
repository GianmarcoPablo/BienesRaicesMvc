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
        const { nombre, apellido, correo, password, numeroContacto } = req.body
        try {

            await prisma.usuarioNormal.update({
                where: {
                    id: id
                },
                data: {
                    usuario: {
                        update: {
                            nombre,
                            apellido,
                            correo,
                            numeroContacto,
                            password
                        }
                    }
                },
            })

            return res.status(200).json("Se actualizo el usuario correctamente")

        } catch (error) {
            return NormalUserController.handleError(error, res);
        }
    }

    static async AgregarCasaFavorito(req: Request, res: Response) {
        const { id } = req.body.usuario
        const { idCasa } = req.body
        try {
            if (!idCasa) throw CustomError.badRequest("No se envio el id de la casa")
            if (!id) throw CustomError.badRequest("No se envio el id del usuario")
            const favorito = await prisma.casaFavoritos.findFirst({
                where: {
                    idUsuario: id,
                    idCasa
                }
            })

            if (favorito) throw CustomError.badRequest("Ya esta casa esta en favoritos")

            await prisma.casaFavoritos.create({
                data: {
                    idCasa,
                    idUsuario: id
                }
            })

            return res.status(200).json("Se agrego la casa a favoritos")

        } catch (error) {
            return NormalUserController.handleError(error, res);
        }
    }

    static async AgregarApartamentoFavorito(req: Request, res: Response) {
        const { id } = req.body.usuario
        const { idApartamento } = req.body
        try {
            if (!idApartamento) throw CustomError.badRequest("No se envio el id del apartamento")
            if (!id) throw CustomError.badRequest("No se envio el id del usuario")
            const favorito = await prisma.apartamentosFavoritos.findFirst({
                where: {
                    idUsuario: id,
                    idApartamento
                }
            })

            if (favorito) throw CustomError.badRequest("Ya esta apartamento esta en favoritos")

            await prisma.apartamentosFavoritos.create({
                data: {
                    idApartamento,
                    idUsuario: id
                }
            })

            return res.status(200).json("Se agrego el apartamento a favoritos")

        } catch (error) {
            return NormalUserController.handleError(error, res);
        }
    }

    static async AgregarTerrenoFavorito(req: Request, res: Response) {

    }

    static async AgregarLocalFavorito(req: Request, res: Response) {

    }
}
