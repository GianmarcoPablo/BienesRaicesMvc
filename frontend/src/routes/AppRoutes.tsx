import { Routes, Route, Navigate } from "react-router-dom"
import AuthRoutes from "../auth/routes/AuthRoutes"
import AgentesRoutes from "../agente/routes/AgentesRoutes"
import UsuarioRoutes from "../usuario/routes/UsuarioRoutes"
import { useAuthStore } from "../store/auth-store"
import HomeLayout from "../home/layout/HomeLayout"

export default function AppRoutes() {

    const { isAuth, rol } = useAuthStore();

    if (isAuth === "checking") return <h1>Checking...</h1>

    return (
        <Routes>
            <Route path="/" element={<HomeLayout />}>
                <Route path="/" element={<h1>Home Page</h1>} />
                <Route path="/casas/:id" element={<h1>Casas</h1>} />
                <Route path="/apartamento/:id" element={<h1>Apartamento</h1>} />
                <Route path="/terreno/:id" element={<h1>Terrenos</h1>} />
                <Route path="/local/:id" element={<h1>locales</h1>} />
                <Route path="/*" element={<Navigate to="/" />} />
            </Route>
            {
                isAuth === "authenticated"
                    ? isAuth === "authenticated" && rol === "usuario"
                        ? <Route path="/usuario/*" element={<UsuarioRoutes />} />
                        : isAuth === "authenticated" && rol === "agente"
                            ? <Route path="/agente/*" element={<AgentesRoutes />} />
                            : <Route path="/auth/*" element={<AuthRoutes />} />
                    : <Route path="/auth/*" element={<AuthRoutes />} />
            }
            {/* {<Route path="/*" element={<Navigate to="/" />} />} */}
            <Route path="/*" element={<h1>Not fount</h1>} />
        </Routes>
    )
}
