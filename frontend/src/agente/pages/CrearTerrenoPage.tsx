import { useState } from "react"
import instance from "../../config/axios"
import Form from "../../components/Form"
export default function CrearTerrenoPage() {

    const [images,setImages] = useState([])

    const handleImages = () => {

    }

    const handleSubmit = () => {

    }
  
    return (
        <Form
            handleImages={handleImages}
            handleSubmit={handleSubmit}
            images={images}
        />
        )
}
