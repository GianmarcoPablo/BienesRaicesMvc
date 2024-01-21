import express, { Router } from "express";
import cors from "cors"
import path from "path";
import fileUpload from "express-fileupload"
import { v4 as uuidv4 } from 'uuid'; // Para generar nombres de archivo únicos


interface Properties {
    port: number
    publicPath: string
    routes: Router
}

export class Server {

    private app = express()
    private port: number
    private publicPath: string
    private routes: Router

    constructor(props: Properties) {
        const { port, publicPath, routes } = props
        this.port = port
        this.publicPath = publicPath
        this.routes = routes
    }

    public async start() {

        this.app.use(cors({
            origin: 'http://localhost:5173',
            credentials: true,
        }))

        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(fileUpload())
        this.app.use(express.static(this.publicPath))

        this.app.use(this.routes)

        this.app.get("*", (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath)
        })

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }
}