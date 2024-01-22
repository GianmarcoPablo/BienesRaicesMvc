import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import instance from "../../config/axios"
import Location from "../../icons/Location"
import { Baños } from "../../icons/Baños"
import Fecha from "../../icons/Fecha"
import formatarFecha from "../../helpers/FormatearFecha"
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


    const obtenerCasa = async () => {
        try {
            const { data } = await instance.get<Casa>(`/casa/${id}`);
            setCasa(data);
            setFotos(data.fotos);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        obtenerCasa();
    }, []);

    return (
        <>
            <div className="grid grid-cols-8 grid-rows-2 gap-1">
                <div className="col-start-5 col-end-7 row-start-1 row-end-2">
                    <img
                        src={`http://localhost:4000/${fotos[0]}`}
                        alt="imagen"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="col-start-5 col-end-7 row-start-2 row-end-3">
                    <img
                        src={`http://localhost:4000/${fotos[4]}`}
                        alt="imagen"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="col-start-7 col-end-9 row-start-1 row-end-2">
                    <img
                        src={`http://localhost:4000/${fotos[3]}`}
                        alt="imagen"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="col-start-7 col-end-9 row-start-2 row-end-3">
                    <img
                        src={`http://localhost:4000/${fotos[2]}`}
                        alt="imagen"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="col-start-1 col-end-5 row-start-1 row-end-3">
                    <img
                        src={`http://localhost:4000/${fotos[1]}`}
                        alt="imagen"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </>
    );
}
