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

export const Loading = () => {
    return (
        <div className="flex justify-center items-center bg-slate-950 h-screen">
            <svg
                className="animate-spin -ml-1 mr-3 h-10 w-10 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
            </svg>
        </div>
    )
}


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
                    <React.Suspense
                        fallback={<Loading />}
                    >
                        <AuthRoutes />
                    </React.Suspense>
                }
            />

            <Route
                path="usuario/*"
                element={
                    <RequireAuth roles={["usuario"]}>
                        <React.Suspense
                            fallback={<Loading />}
                        >
                            <UserRoutes />
                        </React.Suspense>
                    </RequireAuth>
                }
            />

            <Route
                path="agente/*"
                element={
                    <RequireAuth roles={["AgenteInmobiliario"]}>
                        <React.Suspense
                            fallback={<Loading />}
                        >
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