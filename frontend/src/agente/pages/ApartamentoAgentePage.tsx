


import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import instance from "../../config/axios"
import Location from "../../icons/Location";
import Venta from "../../icons/Venta";
import Alquiler from "../../icons/Remta";
import Fecha from "../../icons/Fecha";
import formatarFecha from "../../helpers/FormatearFecha";
interface ApiResponse {
    apartamento: Apartamento[];
    totalCasas: number;
    nextPage: string;
    prevPage: string | null;
}

// Definición de la interfaz para el objeto Casa
interface Apartamento {
    agente: {
        calificacion: number | null;
        especialidad: string;
        experiencia: string; // Asegúrate de especificar el tipo correcto para 'experiencia'
        idUsuario: number;
        ubicacion: string;
        web: string;
    };
    amoblado: boolean;
    antiguedad: string;
    ascensor: boolean;
    balcon: boolean;
    bathrooms: number;
    calefaccion: boolean;
    cocina: boolean;
    creador: any; // Cambia 'any' por el tipo correcto si conoces el tipo exacto de 'creador'
    descripcion: string;
    estado: string;
    fechaPublicacion: string;
    fotos: string[];
    habitaciones: number;
    id: string;
    idAgente: number;
    idCreador: any; // Cambia 'any' por el tipo correcto si conoces el tipo exacto de 'idCreador'
    jardin: boolean;
    numPisos: number;
    parqueadero: boolean;
    piscina: boolean;
    precio: number;
    seguridad: boolean;
    superficie: number;
    terraza: boolean;
    tipo: string;
    tipoTransaccion: string;
    ubicacion: string;
}


export default function ApartamentoAgentePage() {

    const [apartamentos, setApartamentos] = useState<ApiResponse["apartamento"]>([])
    const [loading, setLoading] = useState(false)

    const obtenerCasas = async () => {
        try {
            setLoading(true)
            const { data } = await instance.get('/apartamento')
            setApartamentos(data.apartamento)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        obtenerCasas()
    }, [])


    if (loading) return (
        //skeleton
        <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4 p-4">
            {Array(6).fill(1).map((_, i) => (
                <div
                    key={i}
                    className="animate-pulse rounded shadow-lg flex flex-col justify-between">
                    <div className="w-full h-56 bg-gray-300"></div>
                    <div className="flex justify-between p-2 items-center">
                        <div className="w-1/2 h-4 bg-gray-300"></div>
                        <div className="w-8 h-4 bg-gray-300"></div>
                    </div>
                    <div className="flex justify-between p-2 items-center">
                        <div className="w-1/2 h-4 bg-gray-300"></div>
                        <div className="w-8 h-4 bg-gray-300"></div>
                    </div>
                    <div className="flex justify-between p-2 items-center">
                        <div className="w-1/2 h-4 bg-gray-300"></div>
                        <div className="w-8 h-4 bg-gray-300"></div>
                    </div>
                    <div className="flex justify-between p-2 items-center">
                        <div className="w-1/2 h-4 bg-gray-300"></div>
                        <div className="w-8 h-4 bg-gray-300"></div>
                    </div>
                </div>
            ))}
        </div>
    )

    return (
        <div>
            <nav className="flex items-center justify-end flex-wrap p-6">
                <Link
                    to="/agente/apartamento/create"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Crear Aparamnto
                </Link>
            </nav>

            <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4 p-4">
                <>
                    {apartamentos?.map((apartamento) => (
                        <div key={apartamento.id} className="rounded shadow-lg flex flex-col justify-between">
                            <img
                                className="w-full h-56 object-cover"
                                src={`http://localhost:4000/${apartamento.fotos[0]}`}
                                alt="Sunset in the mountains" />

                            {/* Contenido de la tarjeta */}
                            <div className="flex justify-between p-2 items-center">
                                <p>
                                    Creacion: <span className="text-rose-700 font-bold">{formatarFecha(apartamento.fechaPublicacion)}</span>
                                </p>
                                <div className="w-8">
                                    <Fecha />
                                </div>
                            </div>
                            <div className="flex justify-between p-2 items-center">
                                <p>
                                    Localizacion: <span className="text-rose-700 font-bold">{apartamento.ubicacion}</span>
                                </p>
                                <div className="w-8">
                                    <Location />
                                </div>
                            </div>
                            <div className="flex justify-between p-2 items-center">
                                <p>
                                    Tipo de transaccion: <span className="text-rose-700 font-bold">{apartamento.tipoTransaccion}</span>
                                </p>
                                <div className="w-8">{apartamento.tipoTransaccion === "Venta" ? <Venta /> : <Alquiler />}</div>
                            </div>
                            <div>
                                <Link
                                    to={`/agente/apartamento/${apartamento.id}`}
                                    className="bg-blue-500 text-center hover:bg-blue-700 text-white font-bold py-2 flex w-full rounded mx-auto justify-center"
                                >
                                    Ver Apartamento
                                </Link>
                            </div>
                        </div>
                    ))}
                </>
            </div>
        </div >
    )
}
