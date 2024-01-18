import { Routes, Route, Navigate } from "react-router-dom";
import AgenteLayout from "../layout/AgenteLayout";

export default function AgentesRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AgenteLayout />}>
                <Route path="/" element={<h1>HomePage</h1>} />
                <Route path="/perfil" element={<h1>Profile Page</h1>} />
                <Route path="/casas" element={<h1>Casas</h1>} />
                <Route path="/apartamento" element={<h1>Apartamento</h1>} />
                <Route path="/terrenos" element={<h1>Terrenos</h1>} />
                <Route path="/locales" element={<h1>locales</h1>} />
                <Route path="/*" element={<Navigate to="/agente" />} />
            </Route>
        </Routes>
    )
}
