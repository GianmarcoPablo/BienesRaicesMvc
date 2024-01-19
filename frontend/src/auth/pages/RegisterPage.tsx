
import instance from "../../config/axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../../store/auth-store"
import { Link } from "react-router-dom"


export default function RegisterPage() {

    const { setToken, setProfile, setRole } = useAuthStore()
    const [alert, setAlert] = useState({ tipo: "", mensaje: "" })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const dataform = new FormData(e.currentTarget)
        const nombre = dataform.get('nombre') as string
        const apellido = dataform.get('apellido') as string
        const correo = dataform.get('correo') as string
        const password = dataform.get('password') as string


        if (!nombre || !apellido || !correo || !password) {
            setAlert({ tipo: "error", mensaje: "Todos los campos son obligatorios" })
            return
        }

        try {
            setLoading(true)
            const { data } = await instance.post("/auth/register", { nombre, apellido, correo, password, rol: "Usuario" })
            setToken(data.token)
            setProfile(data.usuario)
            setRole(data.usuario.rol)
            navigate("/")
        } catch (error: any) {
            console.log(error)
            setAlert({
                tipo: "error",
                mensaje: error.response.data.msg || error.reponse.data.error
            })
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1
                    className="animate-pulse text-6xl font-black text-center text-white"
                >
                    Cargando...
                </h1>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/2 xl:w-1/4 sm:px-10">
                {alert.mensaje && (
                    <div className={`p-2 mb-4 text-center text-white rounded-md ${alert.tipo === "error" ? "bg-red-500" : "bg-green-500"}`}>
                        {alert.mensaje}
                    </div>
                )}
                <h3 className="my-5 text-2xl font-black text-center text-gray-700">
                    Bienvenido a <span className="text-rose-600">CloudeMVC</span> Crea una cuenta y explora
                </h3>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm  text-gray-600 uppercase font-bold">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md "
                            placeholder="Nombre" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm  text-gray-600 uppercase font-bold">Apellido</label>
                        <input
                            type="text"
                            name="apellido"
                            id="apellido"
                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md "
                            placeholder="Apellido"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm  text-gray-600 uppercase font-bold">Email</label>
                        <input
                            type="email"
                            name="correo"
                            id="correo"
                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md "
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-600 uppercase">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md "
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-600 uppercase">Repite tu Password</label>
                        <input
                            type="password"
                            name="Rptapassword"
                            id="Rptapassword"
                            placeholder="••••••••"
                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md "
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <button
                        type="submit"
                        className='w-full inline-flex h-12 animate-background-shine items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium  transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white uppercase'>
                        Registrarse
                    </button>
                </div>
                <nav className="flex items-center justify-between mt-4">
                    <Link to="/auth/login" className="text-sm font-bold text-gray-600 uppercase hover:text-rose-600">
                        Ya tienes cuenta? Inicia sesión
                    </Link>
                </nav>
            </form>
        </div>
    )
}
