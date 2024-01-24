import Form from "../../components/Form"
import { useState } from "react"



export default function CrearLocalPage() {

    const [images, setImages] = useState([])

    const handleSubmit = (e: any) => {
        e.preventDefualt()
        try {
            //Todo : peticion a la api con form data para agregar imagnees
        } catch (error) {
            console.log(error)
        }
    }

    const heandleImages = () => {

    }

    return (
        <Form
            handleSubmit={handleSubmit}
            images={images}
            handleImages={heandleImages}
        />
    )
}
