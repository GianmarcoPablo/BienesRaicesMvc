import { Router } from "express";
import { PropiedadController } from "../../controller/propiedades/propiedad.controller";
import { AuthMiddleware } from "../../middlewares/auht.middleware";
import { PropiedadesMiddleware } from "../../middlewares/propiedades.middleware";

export class PropiedadesRoutes {

    static get routes(): Router {
        const router = Router()

        router.get("/", PropiedadController.getPropiedades)
        router.get("/:id", [AuthMiddleware.verify], PropiedadController.getPropiedad)
        router.post("/", [AuthMiddleware.verify, PropiedadesMiddleware.tienePermisos], PropiedadController.createPropiedad)
        router.put("/:id", [AuthMiddleware.verify], PropiedadController.updatePropiedad)
        router.delete("/:id", [AuthMiddleware.verify], PropiedadController.deletePropiedad)

        return router
    }
}