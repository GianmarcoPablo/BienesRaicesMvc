import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import instance from "../../config/axios"
import Location from "../../icons/Location";
import Venta from "../../icons/Venta";
import Alquiler from "../../icons/Remta";
import Fecha from "../../icons/Fecha";
import formatarFecha from "../../helpers/FormatearFecha";
interface ApiResponse {
    casas: Casa[];
    totalCasas: number;
    nextPage: string;
    prevPage: string | null;
}

// Definición de la interfaz para el objeto Casa
interface Casa {
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


export default function CasaAgentePage() {

    const [casas, setCasas] = useState<ApiResponse["casas"]>([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalCasas, setTotalCasas] = useState(0)

    const limit: number = 6;

    const obtenerCasas = async () => {
        try {
            const url = `/casa?page=${page}&limit=${limit}`
            setLoading(true);
            const { data } = await instance.get(url);
            setCasas(data.casas);
            setTotalCasas(data.totalCasas);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }



    useEffect(() => {
        obtenerCasas()
    }, [page])



    function prevPage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    function nextPage() {
        if (casas.length === limit) {
            setPage(page + 1);
        }
    }

    console.log(casas)


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
        <div className="mb-8">
            <div className="flex items-center justify-between flex-wrap p-6 bg-slate-950">
                <p className="text-white text-2xl">Total de casas: <span className="text-rose-500 font-bold">{totalCasas}</span></p>
                <p className="text-white text-2xl">
                    Casas en venta: <span className="text-rose-500 font-bold">{casas?.filter(casa => casa.tipoTransaccion === "Venta").length}</span>
                </p>
                <p className="text-white text-2xl">
                    Casas en alquiler: <span className="text-rose-500 font-bold">{casas?.filter(casa => casa.tipoTransaccion === "Alquiler").length}</span>
                </p>

                <Link
                    to="/agente/casas/create"
                    className="bg-rose-800 hover:bg-rose-900 text-white font-bold py-2 px-4 rounded"
                >
                    Crear Casa
                </Link>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4 p-4">
                <>
                    {casas?.map((casa) => (
                        <div key={casa.id} className="rounded shadow-lg flex flex-col justify-between">
                            <img
                                className="w-full h-56 object-cover"
                                src={`http://localhost:4000/${casa.fotos[0]}`}
                                alt="Sunset in the mountains" />

                            <div className="flex justify-between p-2 items-center">
                                <p>
                                    Creacion: <span className="text-rose-700 font-bold">{formatarFecha(casa.fechaPublicacion)}</span>
                                </p>
                                <div className="w-8">
                                    <Fecha />
                                </div>
                            </div>
                            <div className="flex justify-between p-2 items-center">
                                <p>
                                    Localizacion: <span className="text-rose-700 font-bold">{casa.ubicacion}</span>
                                </p>
                                <div className="w-8">
                                    <Location />
                                </div>
                            </div>
                            <div className="flex justify-between p-2 items-center">
                                <p>
                                    Tipo de transaccion: <span className="text-rose-700 font-bold">{casa.tipoTransaccion}</span>
                                </p>
                                <div className="w-8">{casa.tipoTransaccion === "Venta" ? <Venta /> : <Alquiler />}</div>
                            </div>
                            <div>
                                <Link
                                    to={`/agente/casa/${casa.id}`}
                                    className="bg-blue-500 text-center hover:bg-blue-700 text-white font-bold py-2 flex w-full rounded mx-auto justify-center"
                                >
                                    Ver Casa
                                </Link>
                            </div>
                        </div>
                    ))}
                </>
            </div>

            <div className="flex justify-between items-center">
                <button
                    disabled={page === 1}
                    className={`bg-rose-800 hover:bg-rose-900 text-white font-bold py-2 px-4 rounded ${page === 1 ? "cursor-not-allowed " : ""}`}
                    onClick={prevPage}
                >
                    Anterior
                </button>
                <button
                    className="bg-rose-800 hover:bg-rose-900 text-white font-bold py-2 px-4 rounded"
                    onClick={nextPage}
                >
                    Siguiente
                </button>
            </div>
        </div >
    )
}
