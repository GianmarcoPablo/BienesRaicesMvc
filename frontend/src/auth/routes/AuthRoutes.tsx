import { Routes, Route, Navigate } from "react-router-dom"
import { LoginPage, RegisterPage } from "../pages/"
import AuthLayout from "../layout/AuthLayout"
import { useAuthStore } from "../../store/auth-store"

export default function AuthRoutes() {

    const { isAuth } = useAuthStore()

    if (isAuth === "authenticated") {
        return <Navigate to="/" replace />
    }

    return (
        <Routes>
            <Route path="/" element={<AuthLayout />} >
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="/*" element={<Navigate to="/login" />} />
            </Route>

            {/* <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/*" element={<Navigate to="/auth/login" />} /> */}
        </Routes>
    )
}
