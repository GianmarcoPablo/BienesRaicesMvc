
interface FormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleImages: (e: React.ChangeEvent<HTMLInputElement>) => void;
    images: File[];
}


export default function Form({ handleSubmit, handleImages, images }: FormProps) {
    return (
        <form onSubmit={handleSubmit} className="w-1/2 mx-auto shadow-xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
            <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label htmlFor="grid-first-name" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Tipo
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
                        Precio
                    </label>
                    <input
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
                        Ubicacion
                    </label>
                    <input
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
                        Superficie
                    </label>
                    <input
                        name="superficie"
                        id="superficie"
                        type="number"
                        placeholder="Ej: 100 m2"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    />
                </div>
                <div className="md:w-1/2 px-3">
                    <label htmlFor="estado" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Estado
                    </label>
                    <div className="relative">
                        <select
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
                        Antiguedad
                    </label>
                    <select
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
                        Baños
                    </label>
                    <input
                        name="bathrooms"
                        id="bathrooms"
                        type="number"
                        placeholder="Ej: 2"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    />
                </div>
                <div className="md:w-1/2 px-3">
                    <label htmlFor="habitaciones" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Habitaciones
                    </label>
                    <input
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
                    <select name="seguridad" id="seguridad" className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded">
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
                    <select name="parqueadero" id="parqueadero" className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded">
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
                <input
                    type="file"
                    name="image"
                    id="image"
                    multiple
                    onChange={handleImages}
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                />

                <div className="flex flex-wrap gap-4 mt-4">
                    {images.map((imagen: any, index: number) => (
                        <div key={index}>
                            <img
                                className="h-32 w-32 object-cover"
                                src={URL.createObjectURL(imagen)} alt="imagen"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="-mx-3 mb-2 mt-4">
                <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="descripcion">
                    Descripcion
                </label>
                <textarea
                    name="descripcion"
                    id="descripcion"
                    cols={30}
                    rows={10}
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                />
            </div>

            <div className="flex items-center gap-4 justify-between">
                <button
                    className="w-1/2 bg-blue-700 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                    type="submit"
                >
                    Crear
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
