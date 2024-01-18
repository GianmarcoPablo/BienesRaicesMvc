import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { NormalUserRoutes } from "./normalUser/normal-user.routes";
import { AgenteRoutes } from "./agente/agente.routes";
import { CasaRoutes } from "./casa/casa.routes";
import { ApartamentoRoutes } from "./apartamento/apartamento.routes";
import { TerrenoRoutes } from "./terreno/terreno.routes";
import { LocalRoutes } from "./local/local.routes";

export class indexRoutes {

    static get routes(): Router {
        const router = Router()

        router.use("/api/v1/auth", AuthRoutes.routes)
        router.use("/api/v1/normalUser", NormalUserRoutes.routes)
        router.use("/api/v1/agente", AgenteRoutes.routes)
        router.use("/api/v1/casa", CasaRoutes.routes)
        router.use("/api/v1/apartamento", ApartamentoRoutes.routes)
        router.use("/api/v1/terreno", TerrenoRoutes.routes)
        router.use("/api/v1/local", LocalRoutes.routes)
        return router
    }
}