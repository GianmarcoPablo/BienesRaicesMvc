import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuthStore } from "../../store/auth-store"
import instance from "../../config/axios"
import Location from "../../icons/Location"
import Baños from "../../icons/Baños"
import Fecha from "../../icons/Fecha"
import Venta from "../../icons/Venta"
import Renta from "../../icons/Remta"
import formatarFecha from "../../helpers/FormatearFecha"
import Mueble from "../../icons/Mueble"
import Calefaccion from "../../icons/Calefaccion"
import Parqueadero from "../../icons/Parqueadero"
import Cocina from "../../icons/Cocina"
import Habitaciones from "../../icons/Habitacion"
import Jardin from "../../icons/Jardin"
import Piscina from "../../icons/Piscina"
import Seguridad from "../../icons/Seguridad"
import MetrosCuadrados from "../../icons/MetrosCuadrados"
import Dinero from "../../icons/Dinero"
import Pisos from "../../icons/Pisos"
import FormatearDinero from "../../helpers/FormatearDinero"
interface Casa {
    amoblado: boolean; // se creao icono
    antiguedad: string; // no  se creo icono
    ascensor: boolean; // no  se creo icono
    balcon: boolean; // no  se creo icono
    bathrooms: number; // se creo icono
    calefaccion: boolean; // se creo icono
    cocina: boolean;    // se creo icono
    descripcion: string;    // no  se creo icono
    estado: string; // no  se creo icono
    fechaPublicacion: string; // se creo icono
    fotos: string[]; // no  se creo icono
    habitaciones: number; // se creo icono
    id: string; // no  se creo icono
    idAgente: number;   // no  se creo icono
    idCreador: string | null; // no  se creo icono
    jardin: boolean;  // se creo icono
    numPisos: number; // se creo icono
    parqueadero: boolean; // no  se creo icono
    piscina: boolean;  // se creo icono
    precio: number; // se creo icono
    seguridad: boolean;  // se creo icono
    superficie: number;  // se creo icono
    terraza: boolean;  // no  se creo icono
    tipo: string;  // no  se creo icono
    tipoTransaccion: string;  // no  se creo icono
    ubicacion: string;  // se creo icono
}

export default function CasaPage() {


    const { perfil } = useAuthStore()
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


    const validarVista = () => {
        if (perfil.agenteInmobiliario) {
            if (perfil.agenteInmobiliario.id === casa?.idAgente) {
                return true
            } else {
                return false
            }
        }
        return false
    }


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
                <div className="grid grid-cols-5 gap-4 ">
                    <div className="col-span-4">
                        <div >
                            <div className="flex items-center">
                                <p className="text-4xl font-bold">Precio: {FormatearDinero(casa?.precio!)}</p>
                                <div className="w-10">
                                    <Dinero />
                                </div>
                            </div>
                        </div>
                        <div className="my-4">
                            <div className="grid grid-cols-4 gap-4 items-center mb-4">
                                {/* Baños */}
                                <div className="gap-3">
                                    <Baños />
                                    <p className="text-lg font-bold ">{casa?.bathrooms} baño</p>
                                </div>

                                {/* Habitaciones */}
                                <div className="gap-3">
                                    <Habitaciones />
                                    <p className="text-lg font-bold ">{casa?.habitaciones} hab.</p>
                                </div>

                                {/* Metros Cuadrados */}
                                <div className="gap-3">
                                    <MetrosCuadrados />
                                    <p className="text-lg font-bold ">{casa?.superficie} m²</p>
                                </div>
                                <div className="gap-3">
                                    <Pisos />
                                    <p className="text-lg font-bold ">
                                        {casa?.numPisos} {casa?.numPisos === 1 ? "piso" : "pisos"}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-4  mb-4">
                                <div className="gap-3">
                                    <Cocina />
                                    <p className="text-lg font-bold ">{casa?.cocina ? "Cocina" : "Sin cocina"}</p>
                                </div>

                                <div className="  gap-3">
                                    <Jardin />
                                    <p className="text-lg font-bold ">{casa?.jardin ? "Jardin" : "Sin Jardin"}</p>
                                </div>

                                <div className="  gap-3">
                                    <Piscina />
                                    <p className="text-lg font-bold ">{casa?.piscina ? "Piscina" : "Sin Piscina"}</p>
                                </div>

                                <div className="  gap-3">
                                    <Seguridad />
                                    <p className="text-lg font-bold ">{casa?.seguridad ? "Seguridad" : "Sin Seguridad"}</p>
                                </div>

                            </div>
                            <div className="grid grid-cols-4                                     gap-4 ">
                                <div className="  gap-3">
                                    <Mueble />
                                    <p className="text-lg font-bold ">{casa?.amoblado ? "Amoblado" : "Sin Amoblar"}</p>
                                </div>

                                <div className="  gap-3">
                                    <Calefaccion />
                                    <p className="text-lg font-bold ">{casa?.calefaccion ? "Calefaccion" : "Sin Calefaccion"}</p>
                                </div>

                                <div className="  justify-center gap-3">
                                    <Parqueadero />
                                    <p className="text-lg font-bold ">{casa?.parqueadero ? "Parqueadero" : "Sin Parqueadero"}</p>
                                </div>
                            </div>


                            <div className="my-4">
                                <p className="text-2xl font-bold">Descripción</p>
                                <p className="text-lg">{casa?.descripcion}</p>
                            </ div>

                            <div className="flex justify-between">
                                <div className="my-4">
                                    <p className="text-2xl font-bold">Ubicación</p>
                                    <div className="flex  gap-3">
                                        <Location />
                                        <p className="text-lg">{casa?.ubicacion}</p>
                                    </div>
                                </ div>

                                <div className="my-4">
                                    <p className="text-2xl font-bold">Fecha de publicación</p>
                                    <div className="flex  gap-3">
                                        <Fecha />
                                        <p className="text-lg">{formatarFecha(casa?.fechaPublicacion!)}</p>
                                    </div>
                                </ div>

                                <div className="my-4">
                                    <p className="text-2xl font-bold">Tipo de transacción</p>
                                    <div className="flex  gap-3">
                                        {casa?.tipoTransaccion === "Venta" ? <Venta /> : <Renta />}
                                        <p className="text-lg">{casa?.tipoTransaccion}</p>
                                    </div>
                                </ div>
                            </div>

                        </div>
                    </div>

                    <div className="col-span-1">
                        {
                            validarVista() ?
                                (
                                    <div className="flex flex-col">
                                        <button
                                            className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded w-full mt-5"
                                        >Eliminar</button>
                                        <Link
                                            to={`/agente/casas/editar/${casa?.id}`}
                                            className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded w-full mt-5 text-center"
                                        >Editar</Link>
                                    </div>
                                )
                                : (
                                    <>
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
                                    </>
                                )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
