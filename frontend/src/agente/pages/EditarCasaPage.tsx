import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import instance from "../../config/axios"

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
    fotos: []; // no  se creo icono
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


export default function EditarCasaPage() {

    const { id } = useParams()
    const [casa, setCasa] = useState<Casa | null>(null);
    const [loader, setLoader] = useState(false)
    const [precio, setPrecio] = useState(0)
    const [ubicacion, setUbicacion] = useState("")
    const [superficie, setSuperficie] = useState(0)
    const [estado, setEstado] = useState("")
    const [antiguedad, setAntiguedad] = useState("")
    const [bathrooms, setBathrooms] = useState(0)
    const [habitaciones, setHabitaciones] = useState(0)
    const [numPisos, setNumPisos] = useState(0)
    const [ascensor, setAscensor] = useState(false)
    const [seguridad, setSeguridad] = useState(false)
    const [piscina, setPiscina] = useState(false)
    const [cocina, setCocina] = useState(false)
    const [parqueadero, setParqueadero] = useState(false)
    const [jardin, setJardin] = useState(false)
    const [balcon, setBalcon] = useState(false)
    const [calefaccion, setCalefaccion] = useState(false)
    const [terraza, setTerraza] = useState(false)
    const [amoblado, setAmoblado] = useState(false)
    const [tipoTransaccion, setTipoTransaccion] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [images, setImages] = useState([]);
    const [mensaje, setMensaje] = useState({ msg: "", type: "" });



    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoader(true);
                const { data } = await instance.get(`/casa/${id}`);
                setCasa(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoader(false);
            }
        };
        fetchData();
    }, [id]);


    useEffect(() => {
        console.log("Probando", casa);
        if (casa) {
            setPrecio(casa.precio);
            setUbicacion(casa.ubicacion);
            setSuperficie(casa.superficie);
            setEstado(casa.estado);
            setAntiguedad(casa.antiguedad);
            setBathrooms(casa.bathrooms);
            setHabitaciones(casa.habitaciones);
            setNumPisos(casa.numPisos);
            setAscensor(casa.ascensor);
            setSeguridad(casa.seguridad);
            setPiscina(casa.piscina);
            setCocina(casa.cocina);
            setParqueadero(casa.parqueadero);
            setJardin(casa.jardin);
            setBalcon(casa.balcon);
            setCalefaccion(casa.calefaccion);
            setTerraza(casa.terraza);
            setAmoblado(casa.amoblado);
            setDescripcion(casa.descripcion);
            setTipoTransaccion(casa.tipoTransaccion);
            setImages(casa.fotos);
        }
    }, [casa]);


    if (loader) return <h1>Cargando...</h1>

    const handleImages = (event: any) => {

    }

    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault();
            const form = e.target;
            const dataObj = {
                tipo: "Casa",
                precio: parseInt(form.precio.value),
                ubicacion: form.ubicacion.value,
                superficie: parseInt(form.superficie.value),
                estado: form.estado.value,
                antiguedad: form.antiguedad.value,
                tipoTransaccion: form.tipoTransaccion.value,
                bathrooms: parseInt(form.bathrooms.value),
                habitaciones: parseInt(form.habitaciones.value),
                numPisos: parseInt(form.numPisos.value),
                ascensor: form.ascensor.value === "true" ? true : false,
                seguridad: form.seguridad.value === "true" ? true : false,
                piscina: form.piscina.value === "true" ? true : false,
                cocina: form.cocina.value === "true" ? true : false,
                parqueadero: form.parqueadero.value === "true" ? true : false,
                jardin: form.jardin.value === "true" ? true : false,
                balcon: form.balcon.value === "true" ? true : false,
                calefaccion: form.calefaccion.value === "true" ? true : false,
                terraza: form.terraza.value === "true" ? true : false,
                amoblado: form.amoblado.value === "true" ? true : false,
                descripcion: form.descripcion.value,
                images: images
            }
            console.log(dataObj);
            const { data } = await instance.put(`/casa/${id}`, dataObj);
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className=" md:w-1/2 mx-auto shadow-xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">


            <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label htmlFor="grid-first-name" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Tipo <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="tipo"
                        id="tipo"
                        type="text"
                        placeholder="Jane"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                    />
                </div>
                <div className="md:w-1/2 px-3">
                    <label htmlFor="precio" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Precio <span className="text-red-500">*</span>
                    </label>
                    <input
                        value={precio}
                        onChange={(e) => setPrecio(parseInt(e.target.value))}
                        name="precio"
                        id="precio"
                        type="number"
                        placeholder="Ej: 1000000"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    />
                </div>
            </div>
            <div className="-mx-3 md:flex mb-6">
                <div className="md:w-full px-3">
                    <label htmlFor="ubicacion" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Ubicacion <span className="text-red-500">*</span>
                    </label>
                    <input
                        value={ubicacion}
                        onChange={(e) => setUbicacion(e.target.value)}
                        name="ubicacion"
                        id="ubicacion"
                        type="text"
                        placeholder="Ej: Av. 6 de Agosto #1234"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                    />
                    <p className="text-grey-dark text-xs italic">Make it as long and as crazy as you'd like</p>
                </div>
            </div>
            <div className="-mx-3 md:flex mb-2">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label htmlFor="superficie" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Superficie <span className="text-red-500">*</span>
                    </label>
                    <input
                        value={superficie}
                        onChange={(e) => setSuperficie(parseInt(e.target.value))}
                        name="superficie"
                        id="superficie"
                        type="number"
                        placeholder="Ej: 100 m2"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    />
                </div>
                <div className="md:w-1/2 px-3">
                    <label htmlFor="estado" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Estado <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <select
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            name="estado"
                            id="estado"
                            className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                        >

                            <option value="CasiNuevo">Casi Nuevo</option>
                            <option value="MuyBien">Muy Bien</option>
                            <option value="Bien">Bien</option>
                            <option value="AReformar">A reformar</option>
                            <option value="Reformado">Reformado</option>
                        </select>
                    </div>
                </div>
                <div className="md:w-1/2 px-3">
                    <label htmlFor="antiguedad" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Antiguedad <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={antiguedad}
                        onChange={(e) => setAntiguedad(e.target.value)}
                        name="antiguedad"
                        id="antiguedad"
                        className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                    >
                        <option value="MenosDe1">Menos de 1 año</option>
                        <option value="Entre1Y5">Entre 1 y 5 años</option>
                        <option value="Entre5Y10">Entre 5 y 10 años</option>
                        <option value="Entre10Y20">Entre 10 y 20 años</option>
                        <option value="MasDe20">Más de 20 años</option>
                    </select>
                </div>
            </div>
            <div className="-mx-3 md:flex mb-2 mt-4">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label htmlFor="tipoTransaccion" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Tipo De Transacción
                    </label>
                    <div className="relative">
                        <select
                            value={tipoTransaccion}
                            onChange={(e) => setTipoTransaccion(e.target.value)}
                            name="tipoTransaccion"
                            id="tipoTransaccion"
                            className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                        >

                            <option value="Venta">Venta</option>
                            <option value="Alquiler">Alquiler</option>
                        </select>
                    </div>
                </div>
                <div className="md:w-1/2 px-3">
                    <label htmlFor="bathrooms" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Baños <span className="text-red-500">*</span>
                    </label>
                    <input
                        value={bathrooms}
                        onChange={(e) => setBathrooms(parseInt(e.target.value))}
                        name="bathrooms"
                        id="bathrooms"
                        type="number"
                        placeholder="Ej: 2"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    />
                </div>
                <div className="md:w-1/2 px-3">
                    <label htmlFor="habitaciones" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Habitaciones <span className="text-red-500">*</span>
                    </label>
                    <input
                        value={habitaciones}
                        onChange={(e) => setHabitaciones(parseInt(e.target.value))}
                        name="habitaciones"
                        id="habitaciones"
                        type="number"
                        placeholder="Ej: 3"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    />
                </div>
            </div>

            <div className="-mx-3 md:flex mb-2 mt-4">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label htmlFor="numPisos" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Pisos
                    </label>
                    <input
                        value={numPisos}
                        onChange={(e) => setNumPisos(parseInt(e.target.value))}
                        type="number"
                        name="numPisos"
                        id="numPisos"
                        placeholder="Ej: 2"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    />
                </div>
                <div className="md:w-1/2 px-3">
                    <label htmlFor="ascensor" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Ascensor
                    </label>
                    <div className="relative">
                        <select
                            value={ascensor.toString()}
                            onChange={(e) => setAscensor(e.target.value === "true" ? true : false)}
                            name="ascensor"
                            id="ascensor"
                            className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                        >
                            <option value="true">Si</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>
                <div className="md:w-1/2 px-3">
                    <label htmlFor="seguridad" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Seguridad
                    </label>
                    <select
                        value={seguridad.toString()}
                        onChange={(e) => setSeguridad(e.target.value === "true" ? true : false)}
                        name="seguridad" id="seguridad" className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded">
                        <option value="true">Si</option>
                        <option value="false">No</option>
                    </select>
                </div>
            </div>
            <div className="-mx-3 md:flex mb-2 mt-4">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label htmlFor="piscina" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Piscina
                    </label>
                    <div className="relative">
                        <select
                            value={piscina.toString()}
                            onChange={(e) => setPiscina(e.target.value === "true" ? true : false)}
                            name="piscina"
                            id="piscina"
                            className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                        >
                            <option value="true">Si</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>
                <div className="md:w-1/2 px-3">
                    <label htmlFor="cocina" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Cocina
                    </label>
                    <div className="relative">
                        <select
                            value={cocina.toString()}
                            onChange={(e) => setCocina(e.target.value === "true" ? true : false)}
                            name="cocina"
                            id="cocina"
                            className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                        >
                            <option value="true">Si</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>
                <div className="md:w-1/2 px-3">
                    <label htmlFor="parqueadero" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Parqueadero
                    </label>
                    <select
                        value={parqueadero.toString()}
                        name="parqueadero" id="parqueadero" className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded">
                        <option value="true">Si</option>
                        <option value="false">No</option>
                    </select>
                </div>
            </div>
            <div className="-mx-3 md:flex mb-2 mt-4">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label htmlFor="jardin" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Jardin
                    </label>
                    <div className="relative">
                        <select
                            value={jardin.toString()}
                            onChange={(e) => setJardin(e.target.value === "true" ? true : false)}
                            name="jardin"
                            id="jardin"
                            className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                        >
                            <option value="true">Si</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>
                <div className="md:w-1/2 px-3">
                    <label htmlFor="balcon" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Balcon
                    </label>
                    <div className="relative">
                        <select
                            value={balcon.toString()}
                            onChange={(e) => setBalcon(e.target.value === "true" ? true : false)}
                            name="balcon"
                            id="balcon"
                            className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                        >
                            <option value="true">Si</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>
                <div className="md:w-1/2 px-3">
                    <label htmlFor="calefaccion" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Calefaccion
                    </label>
                    <select
                        value={calefaccion.toString()}
                        onChange={(e) => setCalefaccion(e.target.value === "true" ? true : false)}
                        name="calefaccion"
                        id="calefaccion"
                        className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded">
                        <option value="true">Si</option>
                        <option value="false">No</option>
                    </select>
                </div>
            </div>
            <div className="-mx-3 md:flex mb-2 mt-4">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label htmlFor="terraza" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Terraza
                    </label>
                    <div className="relative">
                        <select
                            value={terraza.toString()}
                            onChange={(e) => setTerraza(e.target.value === "true" ? true : false)}
                            name="terraza"
                            id="terraza"
                            className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                        >
                            <option value="true">Si</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>
                <div className="md:w-1/2 px-3">
                    <label htmlFor="amoblado" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Amoblado
                    </label>
                    <div className="relative">
                        <select
                            value={amoblado.toString()}
                            onChange={(e) => setAmoblado(e.target.value === "true" ? true : false)}
                            name="amoblado"
                            id="amoblado"
                            className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                        >
                            <option value="true">Si</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="-mx-3 mb-2 mt-4">
                <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="image">
                    Imagen
                </label>

            </div>

            <div className="-mx-3 mb-2 mt-4">
                <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="descripcion">
                    Descripcion
                </label>
                <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    name="descripcion"
                    id="descripcion"
                    cols={30}
                    rows={10}
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                />
            </div>

            <div className="flex items-center gap-4 justify-between">
                <button
                    className={loader ? "w-1/2 bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed" : "w-1/2 bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"}
                    type="submit"
                    disabled={loader}
                >
                    {loader ? "Creando..." : "Editar"}
                </button>
                <button

                    className="w-1/2 bg-rose-700 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                    type="button"
                >
                    Cancelar
                </button>
            </div>
        </form>
    )
}
