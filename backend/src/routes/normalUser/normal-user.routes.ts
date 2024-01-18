import { Router } from "express";
import { NormalUserController } from "../../controller/normalUser/normal-user.controller";
import { NormalUserMiddleware } from "../../middlewares/normal-user.middleware";
import { AuthMiddleware } from "../../middlewares/auht.middleware";
export class NormalUserRoutes {
    static get routes(): Router {
        const router = Router()

        router.get("/mi-perfil", [AuthMiddleware.verify, NormalUserMiddleware.tienePermisos], NormalUserController.MiPerfil)

        router.put("/actualizar-perfil", [AuthMiddleware.verify, NormalUserMiddleware.tienePermisos], NormalUserController.ActualizarPerfil)

        router.post("/casa/agregar-favorito", [AuthMiddleware.verify, NormalUserMiddleware.tienePermisos], NormalUserController.AgregarCasaFavorito)

        router.post("/apartamento/agregar-favorito", [AuthMiddleware.verify, NormalUserMiddleware.tienePermisos], NormalUserController.AgregarApartamentoFavorito)
        return router
    }
}