import { Router } from "express";
import { NormalUserController } from "../../controller/normalUser/normal-user.controller";
import { NormalUserMiddleware } from "../../middlewares/normal-user.middleware";
import { AuthMiddleware } from "../../middlewares/auht.middleware";
export class NormalUserRoutes {
    static get routes(): Router {
        const router = Router()

        router.get("/mi-perfil", [AuthMiddleware.verify, NormalUserMiddleware.tienePermisos], NormalUserController.MiPerfil)

        router.put("/actualizar-perfil", [AuthMiddleware.verify, NormalUserMiddleware.tienePermisos], NormalUserController.ActualizarPerfil)

        router.post("/propiedad/favorita", [AuthMiddleware.verify, NormalUserMiddleware.tienePermisos], NormalUserController.agregarPropiedadFavorita)

        router.delete("/propiedad/favorita", [AuthMiddleware.verify, NormalUserMiddleware.tienePermisos], NormalUserController.eliminarPropiedadFavorita)

        router.get("/propiedad/favorita", [AuthMiddleware.verify, NormalUserMiddleware.tienePermisos], NormalUserController.listarPropiedadesFavoritas)



        return router
    }
}