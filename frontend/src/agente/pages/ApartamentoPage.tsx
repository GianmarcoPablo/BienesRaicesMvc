import { useParams } from "react-router-dom";
import instance from "../../config/axios";
import { useEffect, useState } from "react";

export default function ApartamentoPage() {

    const { id } = useParams()
    const [apartamento, setApartamento] = useState({})
    const [fotos, setFotos] = useState<string[]>([]);
    const [loading, setLoading] = useState(false)

    const obtenerApartameno = async () => {
        try {
            setLoading(true)
            const { data } = await instance.get(`/apartamento/${id}`)
            setApartamento(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        obtenerApartameno()
    }, [])

    return (
        <>
        </>
    )
}