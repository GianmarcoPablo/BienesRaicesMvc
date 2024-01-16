import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { PropiedadesRoutes } from "./propiedades/propiedad.routes";
import { NormalUserRoutes } from "./normalUser/normal-user.routes";
import { AgenteRoutes } from "./agente/agente.routes";

export class indexRoutes {

    static get routes(): Router {
        const router = Router()

        router.use("/api/v1/auth", AuthRoutes.routes)
        router.use("/api/v1/propiedades", PropiedadesRoutes.routes)
        router.use("/api/v1/normalUser", NormalUserRoutes.routes)
        router.use("/api/v1/agente", AgenteRoutes.routes)
        return router
    }
}