import { useState } from "react";
import instance from "../../config/axios"
import Form from "../../components/Form";

export default function CrearCasaPage() {

    const [images, setImages] = useState([]);

    const handleImages = (event: any) => {
        const files = Array.from(event.target.files);
        setImages(files as any);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
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

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
            const { data } = await instance.post("/casa", dataObj, config);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <Form
                images={images}
                handleImages={handleImages}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}