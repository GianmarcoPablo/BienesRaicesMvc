import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auht.middleware";
import { AgenteController } from "../../controller/agente/agente.controller";
import { AgenteMiddleware } from "../../middlewares/agente.middleware";

export class AgenteRoutes {
    static get routes(): Router {
        const router = Router()

        router.get("/mi-perfil", [AuthMiddleware.verify, AgenteMiddleware.tienePermisos], AgenteController.MiPerfil)
        router.put("/actualizar-perfil", [AuthMiddleware.verify, AgenteMiddleware.tienePermisos], AgenteController.ActualizarPerfil)
        return router
    }
}