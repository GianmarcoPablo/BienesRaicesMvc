import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import React from "react";

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
                    <RequireAuth roles={["user"]}>
                        <React.Suspense fallback="Loading...">
                            <UserRoutes />
                        </React.Suspense>
                    </RequireAuth>
                }
            />

            <Route
                path="agente/*"
                element={
                    <RequireAuth roles={["agent"]}>
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

    if (isAuth === "not-authenticated") {
        return <Navigate to="/auth/login" replace />;
    }

    if (roles && !roles.includes(rol!)) {
        return <Navigate to="/auth/login" replace />;
    }

    return children;
}