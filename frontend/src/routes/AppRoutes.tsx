import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";

// Layout
import HomeLayout from "../home/layout/HomeLayout";
import { useAuthStore } from "../store/auth-store";

// Pages
const HomePage = lazy(() => import("../home/pages/HomePage"));

// Auth
const AuthRoutes = lazy(() => import("../auth/routes/AuthRoutes"));

// User area
const UserRoutes = lazy(() => import("../usuario/routes/UsuarioRoutes"));

// Agent area 
const AgentRoutes = lazy(() => import("../agente/routes/AgentesRoutes"));

export default function AppRoutes() {

    return (
        <Routes>
            <Route path="/" element={<HomeLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/casas" element={<h1>Casas</h1>} />
                <Route path="/apartamento" element={<h1>Apartamento</h1>} />
                <Route path="/terrenos" element={<h1>Terrenos</h1>} />
                <Route path="/locales" element={<h1>locales</h1>} />
            </Route>

            <Route
                path="auth/*"
                element={
                    <React.Suspense fallback="Loading...">
                        <AuthRoutes />
                    </React.Suspense>
                }
            />

            <Route
                path="usuario/*"
                element={
                    <RequireAuth roles={["usuario"]}>
                        <React.Suspense fallback="Loading...">
                            <UserRoutes />
                        </React.Suspense>
                    </RequireAuth>
                }
            />

            <Route
                path="agente/*"
                element={
                    <RequireAuth roles={["AgenteInmobiliario"]}>
                        <React.Suspense fallback="Loading...">
                            <AgentRoutes />
                        </React.Suspense>
                    </RequireAuth>
                }
            />

        </Routes>
    );
}

interface RequireAuthProps {
    children: React.ReactNode;
    roles?: string[];
}


function RequireAuth({ children, roles }: RequireAuthProps) {

    const { isAuth, rol } = useAuthStore();

    console.log("isAuth", isAuth);
    console.log("rol", rol);

    if (isAuth === "not-authenticated") {
        return <Navigate to="/auth/login" replace />;
    }

    if (roles && !roles.includes(rol!)) {
        return <Navigate to="/auth/login" replace />;
    }

    return children;
}