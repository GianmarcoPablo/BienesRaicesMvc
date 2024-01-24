import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import instance from "../../config/axios"

export default function TerrenoPage() {

    const { id } = useParams()
    const [terreno, setTerreno] = useState({})

    const obtenerTerreno = async () => {
        const { data } = await instance.get(`/terreno/${id}`)
        setTerreno(data)
    }

    useEffect(() => {
        obtenerTerreno()
    }, [])

    return (
        <div>
            Terreno Page
        </div>
    )
}
