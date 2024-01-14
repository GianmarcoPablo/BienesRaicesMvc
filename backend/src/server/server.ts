import express, { Router } from "express";
import cors from "cors"
import path from "path";

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

        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
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