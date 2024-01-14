import { Server } from "./server/server"
import { envs } from "./config/envs";
import { indexRoutes } from "./routes/index.routes";

(() => {
    main();
})();

function main() {
    const server = new Server({
        port: envs.PORT,
        publicPath: envs.PUBLIC_PATH,
        routes: indexRoutes.routes
    })
    server.start()
}