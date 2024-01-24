import { Routes, Route, Navigate } from "react-router-dom";
import AgenteLayout from "../layout/AgenteLayout";
import { PerfilPage, HomePage, ApartamentoAgentePage, CasaAgentePage, CrearApartamentoPage,ApartamentoPage, CrearCasaPage, CasaPage, LocalAgentePage, CrearLocalPage, LocalPage, TerrenoAgentePage, CrearTerrenoPage, TerrenoPage } from "../pages";

export default function AgentesRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AgenteLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/perfil" element={<PerfilPage />} />
                <Route path="/casas/create" element={<CrearCasaPage />} />
                <Route path="/casas" element={<CasaAgentePage />} />
                <Route path="/casa/:id" element={<CasaPage />} />
                <Route path="/apartamento/create" element={<CrearApartamentoPage />} />
                <Route path="/apartamento" element={<ApartamentoAgentePage />} />
                <Route path="/apartamento/:id" element={<ApartamentoPage/>} />
                <Route path="/locales/create" element={<CrearLocalPage />} />
                <Route path="/locales" element={<LocalAgentePage />} />
                <Route path="/local/:id" element={<LocalPage />} />
                <Route path="/terrenos" element={<TerrenoAgentePage />} />
                <Route path="/terreno/:id" element={<TerrenoPage />} />
                <Route path="/terrenos/create" element={<CrearTerrenoPage />} />
                <Route path="/*" element={<Navigate to="/agente" />} />
            </Route>
        </Routes>
    )
}
