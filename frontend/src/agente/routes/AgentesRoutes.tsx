import { Routes, Route, Navigate } from "react-router-dom";
import AgenteLayout from "../layout/AgenteLayout";
import { PerfilPage, HomePage, ApartamentoAgentePage, CasaAgentePage, CrearApartamentoPage, CrearCasaPage, CasaPage } from "../pages";

export default function AgentesRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AgenteLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/perfil" element={<PerfilPage />} />
                <Route path="/casas" element={<CasaAgentePage />} />
                <Route path="/casa/:id" element={<CasaPage />} />
                <Route path="/casas/create" element={<CrearCasaPage />} />
                <Route path="/apartamento" element={<ApartamentoAgentePage />} />
                <Route path="/apartamento/create" element={<CrearApartamentoPage />} />
                <Route path="/terrenos" element={<h1>Terrenos</h1>} />
                <Route path="/locales" element={<h1>locales</h1>} />
                <Route path="/*" element={<Navigate to="/agente" />} />
            </Route>
        </Routes>
    )
}
