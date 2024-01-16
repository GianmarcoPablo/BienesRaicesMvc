import { Request, Response, NextFunction } from "express";
import { prisma } from "../model/postgresql";

export class NormalUserMiddleware {

    static async tienePermisos(req: Request, res: Response, next: NextFunction) {
        const { user } = req.body;

        if (user.rol === "Agente") return res.status(401).json({ msg: "No tienes permiso para realizar esta acción" });

        const usuario = await prisma.usuarioNormal.findUnique({ where: { idUsuario: user.id } });
        if (!usuario) return res.status(401).json({ msg: "No tienes permiso para realizar esta acción" });

        req.body.usuario = usuario;
        next();
    }
}