import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auht.middleware";
import { CasaController } from "../../controller/casa/casa.controller";
import { CrearMiddleware } from "../../middlewares/crear.middleware";


export class CasaRoutes {

    static get routes(): Router {
        const router = Router()

        router.get("/", [AuthMiddleware.verify, CrearMiddleware.Comprobar], CasaController.getCasas)
        router.get("/:id", [AuthMiddleware.verify, CrearMiddleware.Comprobar], CasaController.getCasa)
        router.post("/", [AuthMiddleware.verify, CrearMiddleware.Comprobar
        ], CasaController.createCasa)
        router.put("/:id", [AuthMiddleware.verify], CasaController.updateCasa)
        router.delete("/:id", [AuthMiddleware.verify], CasaController.deleteCasa)

        return router
    }
}

