import Form from "../../components/Form"
import { useState } from "react"



export default function CrearLocalPage() {

    const [images, setImages] = useState([])

    const handleSubmit = (e: any) => {
        e.preventDefualt()
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
