import { Route, Routes, Navigate } from "react-router-dom"


export default function UsuarioRoutes() {
    return (
        <Routes>
            <Route path="/" element={<h1>HomePage</h1>} />
            <Route path="/perfil" element={<h1>Profile Page</h1>} />
            <Route path="/*" element={<Navigate to="/usuario" />} />
        </Routes>
    )
}
