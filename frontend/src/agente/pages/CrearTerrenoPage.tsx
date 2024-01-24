import { useState } from "react"
import instance from "../../config/axios"
import Form from "../../components/Form"
export default function CrearTerrenoPage() {

    const [images, setImages] = useState([])

    const handleImages = () => {
    }

    const handleSubmit = (e: any) => {
        e.preventDefualt()
        try {
            //:Todo peticion a la api
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Form
            handleImages={handleImages}
            handleSubmit={handleSubmit}
            images={images}
        />
    )
}
