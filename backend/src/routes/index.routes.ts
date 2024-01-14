import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { PropiedadesRoutes } from "./propiedades/propiedad.routes";

export class indexRoutes {

    static get routes(): Router {
        const router = Router()

        router.use("/api/v1/auth", AuthRoutes.routes)
        router.use("/api/v1/propiedades", PropiedadesRoutes.routes)
        return router
    }
}