import { create } from "zustand";
import { persist } from "zustand/middleware";

type StatusAuth = "authenticated" | "not-authenticated" | "checking"
type UserRole = "usuario" | "agente" | null

interface Profile {
    id: number,
    nombre: string,
    apellido: string,
    rol: string,
    correo: string,
    administrador?: any,
    agenteInmobiliario?: any,
    usuarioNormal?: any,
    moderador?: any,
}

type State = {
    token: string,
    perfil: Profile,
    isAuth: StatusAuth,
    rol: UserRole,
}

type Actions = {
    setToken: (token: string) => void,
    setProfile: (profile: Profile) => void,
    setRole: (role: UserRole) => void,
    logout: () => void,
}

export const useAuthStore = create(persist<State & Actions>((set) => ({
    token: "",
    perfil: {} as Profile,
    isAuth: "not-authenticated",
    rol: null,


    setToken: (token: string) => set(() => ({
        checking() {
            return "checking"
        },
        token,
        isAuth: "authenticated",
    })),

    setProfile: (perfil: Profile) => set((state) => ({

        perfil,
        isAuth: state.token ? "authenticated" : "not-authenticated",
    })),

    setRole: (rol: UserRole) => set(() => ({

        rol,
    })),

    logout: () => set(() => ({
        token: "",
        perfil: {} as Profile,
        isAuth: "not-authenticated",
        rol: null
    })),



}), {
    name: "auth-storage-persist"
}))