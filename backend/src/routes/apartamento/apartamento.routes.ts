import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auht.middleware";
import { ApartamentoController } from "../../controller/apartamento/aparatamento.controller";
import { CrearMiddleware } from "../../middlewares/crear.middleware";

export class ApartamentoRoutes {

    static get routes(): Router {
        const router = Router()

        router.get("/", [AuthMiddleware.verify, CrearMiddleware.Comprobar], ApartamentoController.getApartamentos)
        router.get("/:id", ApartamentoController.getApartamento)
        router.post("/", [AuthMiddleware.verify, CrearMiddleware.Comprobar], ApartamentoController.createApartamento)
        router.put("/:id", [AuthMiddleware.verify], ApartamentoController.updateApartamento)

        return router
    }
}