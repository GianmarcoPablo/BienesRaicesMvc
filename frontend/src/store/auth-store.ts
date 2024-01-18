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
}

type State = {
    token: string,
    perfil: Profile,
    isAuth: StatusAuth,
    rol: UserRole
}

type Actions = {
    setToken: (token: string) => void,
    setProfile: (profile: Profile) => void,
    setRole: (role: UserRole) => void,
    logout: () => void,
    checking: () => void
}

export const useAuthStore = create(persist<State & Actions>((set) => ({
    token: "",
    perfil: {} as Profile,
    isAuth: "not-authenticated",
    rol: null,

    setToken: (token: string) => set(() => ({
        token,
        isAuth: "checking"
    })),

    setProfile: (perfil: Profile) => set((state) => ({
        perfil,
        isAuth: state.token ? "authenticated" : "not-authenticated",
    })),

    setRole: (rol: UserRole) => set(() => ({
        rol
    })),

    logout: () => set(() => ({
        token: "",
        perfil: {} as Profile,
        isAuth: "not-authenticated",
        rol: null
    })),

    checking: () => set(() => ({
        isAuth: "checking"
    }))

}), {
    name: "auth-storage-persist"
}))