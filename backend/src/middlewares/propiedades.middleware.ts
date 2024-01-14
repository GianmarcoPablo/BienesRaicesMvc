import { Request, Response, NextFunction } from "express"
import { prisma } from "../model/postgresql";
export class PropiedadesMiddleware {

    static async tienePermisos(req: Request, res: Response, next: NextFunction) {
        const { user } = req.body
        if (user.rol === "Usuario") return res.status(401).json({ msg: "No tienes permiso para realizar esta acción" })

        const agente = await prisma.agenteInmobiliario.findUnique({ where: { idUsuario: user.id } })
        if (!agente) return res.status(401).json({ msg: "No tienes permiso para realizar esta acción" })
        req.body.agente = agente
        next()
    }
}