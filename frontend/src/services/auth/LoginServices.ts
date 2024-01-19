
import instance from "../../config/axios"
export const loginRequest = async (correo: string, password: string) => {

    try {
        const { data } = await instance.post("/auth/login", {
            correo,
            password
        })
        return data
    } catch (error: any) {
        return error
    }
}