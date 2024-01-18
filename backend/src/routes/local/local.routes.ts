import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auht.middleware";
import { CrearMiddleware } from "../../middlewares/crear.middleware";
import { LocalController } from "../../controller/local/local.controller";

export class LocalRoutes {
    static get routes(): Router {
        const router = Router()

        router.get("/", [AuthMiddleware.verify, CrearMiddleware.Comprobar], LocalController.getLocales)
        router.get("/:id", [AuthMiddleware.verify, CrearMiddleware.Comprobar], LocalController.getLocal)
        router.post("/", [AuthMiddleware.verify, CrearMiddleware.Comprobar], LocalController.createLocal)
        router.put("/:id", [AuthMiddleware.verify, CrearMiddleware.Comprobar], LocalController.updateLocal)
        router.delete("/:id", [AuthMiddleware.verify, CrearMiddleware.Comprobar], LocalController.deleteLocal)
        return router
    }
}