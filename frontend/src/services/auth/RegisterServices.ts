import instance from "../../config/axios"

interface Props {
    nombre: string,
    apellido: string,
    correo: string,
    password: string,
}

export const registerRequest = async (props: Props) => {
    const { nombre, apellido, correo, password } = props
    try {
        const { data } = await instance.post("/auth/login", {
            nombre,
            apellido,
            correo,
            password
        })
        return data
    } catch (error: any) {
        console.log(error)
    }
}