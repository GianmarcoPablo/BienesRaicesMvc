import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import instance from "../../config/axios"
export default function CasaPage() {

    const { id } = useParams<{ id: string }>()
    const [casa, setCasa] = useState({})

    const obtenerCasa = async () => {
        try {
            const { data } = await instance.get(`/casa/${id}`)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        obtenerCasa()
    }, [])

    return (
        <div>CasaPage</div>
    )
}
