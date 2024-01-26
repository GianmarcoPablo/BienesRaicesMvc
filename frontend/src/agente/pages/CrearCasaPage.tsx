import { useState } from "react";
import instance from "../../config/axios"
import Form from "../../components/Form";

export default function CrearCasaPage() {

    const [images, setImages] = useState([]);
    const [mensaje, setMensaje] = useState({ msg: "", type: "" });
    const [loader, setLoader] = useState(false);

    const handleImages = (event: any) => {
        const files = Array.from(event.target.files);
        setImages(files as any);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {

            // evitar que se spamee el boton de submit

            if (loader) return;


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


            // validar data del formulario

            // primero validar compos obligatorios
            if (dataObj.precio === 0 || dataObj.ubicacion === "" || dataObj.superficie === 0 || dataObj.habitaciones || dataObj.bathrooms === 0 || dataObj.estado || dataObj.antiguedad === "") {
                setMensaje({ msg: "Los campos como precio, ubicacion, superficie, habitaciones, bathrooms, estado y antiguedad son obligatorios", type: "error" })
                return
            }

            if (dataObj.precio < 0 || dataObj.superficie < 0 || dataObj.habitaciones < 0 || dataObj.bathrooms < 0 || dataObj.numPisos < 0) {
                setMensaje({ msg: "Los campos como precio, superficie, habitaciones, bathrooms y numPisos no pueden ser negativos", type: "error" })
                return
            }

            if (dataObj.descripcion.length > 500) {
                setMensaje({ msg: "La descripcion no puede tener mas de 500 caracteres", type: "error" })
                return
            }

            if (images.length < 5) {
                setMensaje({ msg: "Como minimo se deben subir 5 imagenes", type: "error" })
                return
            }

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

            setLoader(true);
            const { data } = await instance.post("/casa", dataObj, config);
            console.log(data);

            // reset form
            form.reset();

        } catch (error) {
            console.log(error);
        } finally {
            setLoader(false);
        }
    }


    return (
        <div>
            <Form
                images={images}
                handleImages={handleImages}
                handleSubmit={handleSubmit}
                mensaje={mensaje}
                loader={loader}
            />
        </div>
    )
}