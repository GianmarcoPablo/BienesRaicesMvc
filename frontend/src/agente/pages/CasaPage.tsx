import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import instance from "../../config/axios"
import Location from "../../icons/Location"
import Baños from "../../icons/Baños"
import Fecha from "../../icons/Fecha"
import Venta from "../../icons/Venta"
import Renta from "../../icons/Remta"
import formatarFecha from "../../helpers/FormatearFecha"
import Cocina from "../../icons/Cocina"
import Habitaciones from "../../icons/Habitacion"
import Jardin from "../../icons/Jardin"
import Piscina from "../../icons/Piscina"
import Seguridad from "../../icons/Seguridad"
import MetrosCuadrados from "../../icons/MetrosCuadrados"
import Dinero from "../../icons/Dinero"
interface Casa {
    amoblado: boolean;
    antiguedad: string;
    ascensor: boolean;
    balcon: boolean;
    bathrooms: number;
    calefaccion: boolean;
    cocina: boolean;
    descripcion: string;
    estado: string;
    fechaPublicacion: string;
    fotos: string[];
    habitaciones: number;
    id: string;
    idAgente: number;
    idCreador: string | null;
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

export default function CasaPage() {

    const { id } = useParams<{ id: string }>();
    const [casa, setCasa] = useState<Casa | null>(null);
    const [fotos, setFotos] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const obtenerCasa = async () => {
        try {
            setLoading(true);
            const { data } = await instance.get<Casa>(`/casa/${id}`);
            setCasa(data);
            setFotos(data.fotos);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        obtenerCasa();
    }, []);


    if (loading) {
        return (
            <div
                className="grid grid-cols-8 grid-rows-2 gap-1"
            >
                <div className="col-start-5 col-end-7 row-start-1 row-end-2">
                    <div className="animate-pulse bg-gray-300 rounded-md"></div>
                </div>

                <div className="col-start-5 col-end-7 row-start-2 row-end-3">
                    <div className="animate-pulse bg-gray-300 rounded-md"></div>
                </div>

                <div className="col-start-7 col-end-9 row-start-1 row-end-2">
                    <div className="animate-pulse bg-gray-300 rounded-md"></div>
                </div>

                <div className="col-start-7 col-end-9 row-start-2 row-end-3">
                    <div className="animate-pulse bg-gray-300 rounded-md"></div>
                </div>

                <div className="col-start-1 col-end-5 row-start-1 row-end-3">
                    <div className="animate-pulse bg-gray-300 rounded-md"></div>
                </div>
            </div>
        )
    }


    return (
        <>
            <div className="grid grid-cols-8 grid-rows-2 gap-1">
                {fotos.map((foto, index) => (
                    <div
                        key={index}
                        className={`col-start-${(index % 2) * 2 + 5} col-end-${(index % 2) * 2 + 7} row-start-${Math.floor(index / 2) + 1} row-end-${Math.floor(index / 2) + 2}`}
                    >
                        <img
                            src={`http://localhost:4000/${foto}`}
                            alt={`imagen-${index}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            <div className="my-10">
                <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-4">
                        <div>
                            <div className="flex items-center ">
                                <p className="text-4xl font-bold">Precio: {casa?.precio}</p>
                                <div className="w-10">
                                    <Dinero />
                                </div>
                            </div>
                            <p className="text-2xl font-bold">{casa?.tipoTransaccion}</p>
                        </div>
                        <div className="my-4">
                            <div className="grid grid-cols-4 gap-4 items-center">
                                {/* Baños */}
                                <div className=" items-center gap-3">
                                    <Baños />
                                    <p className="text-lg ml-2">{casa?.bathrooms} baño</p>
                                </div>

                                {/* Habitaciones */}
                                <div className=" items-center gap-3">
                                    <Habitaciones />
                                    <p className="text-lg ml-2">{casa?.habitaciones} hab.</p>
                                </div>

                                {/* Metros Cuadrados */}
                                <div className=" items-center gap-3">
                                    <MetrosCuadrados />
                                    <p className="text-lg ml-2">{casa?.superficie} m²</p>
                                </div>
                                <div className=" items-center gap-3">
                                    <Cocina />
                                    <p className="text-lg ml-2">
                                        {casa?.cocina ? "Cocina" : "Sin cocina"}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>



                    <div className="col-span-1">
                        <form className="bg-gray-300 p-4 w-80">
                            <fieldset>
                                <legend className="text-2xl font-bold">Contactar al agente</legend>
                                <input
                                    type="text"
                                    name="nombre"
                                    id="nombre"
                                    className=" rounded-md w-full py-2 my-2 px-2"
                                    placeholder="Tú Nombre"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className=" rounded-md w-full py-2 my-2 px-2"
                                    placeholder="Tú Email (obligatorio)"
                                />
                                <input
                                    type="tel"
                                    name="telefono"
                                    id="telefono"
                                    className=" rounded-md w-full py-2 my-2 px-2"
                                    placeholder="Tú Teléfono"
                                />
                                <select
                                    name="motivo"
                                    id="motivo"
                                    className=" rounded-md w-full py-2 my-2"
                                >
                                    <option>¿Cual es tu motivo de contacto?</option>
                                    <option>Concertar una visita</option>
                                    <option>Obtener más detalles</option>
                                    <option>Conoces ubicacion exacta</option>
                                    <option>Quiero que me llamen</option>
                                    <option>Otros</option>
                                </select>
                                <button
                                    type="submit"
                                    className="bg-rose-800 hover:bg-rose-900 text-white font-bold py-2 px-4 rounded w-full mt-5">Enviar</button>
                            </fieldset>
                        </form>
                    </div>
                </div>



            </div>
        </>
    );
}
