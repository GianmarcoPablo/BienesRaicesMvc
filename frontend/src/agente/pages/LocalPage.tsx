import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import instance from "../../config/axios"
export default function LocalPage() {

    const { id } = useParams()
    const [local, setLocal] = useState({})

    const obtenerLocal = async () => {
        const { data } = await instance.get(`/local/${id}`)
        setLocal(data)
    }

    useEffect(() => {
        obtenerLocal()
    }, [])

    return (
        <div>LocalPage</div>
    )
}
