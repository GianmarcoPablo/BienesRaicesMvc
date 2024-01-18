import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auht.middleware";
import { CrearMiddleware } from "../../middlewares/crear.middleware";
import { TerrenoController } from "../../controller/terreno/terreno.controller";
export class TerrenoRoutes {
    static get routes(): Router {
        const router = Router()

        router.get("/", [AuthMiddleware.verify, CrearMiddleware.Comprobar], TerrenoController.getTerrenos)
        router.get("/:id", TerrenoController.getTerreno)
        router.post("/", [AuthMiddleware.verify, CrearMiddleware.Comprobar], TerrenoController.createTerreno)
        router.put("/:id", [AuthMiddleware.verify], TerrenoController.updateTerreno)
        router.delete("/:id", [AuthMiddleware.verify], TerrenoController.deleteTerreno)
        return router
    }
}