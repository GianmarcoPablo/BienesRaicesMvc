export enum RolUsuario {
    Usuario = "Usuario",
    AgenteInmobiliario = "AgenteInmobiliario",
    Moderador = "Moderador",
    Administrador = "Administrador"
}

export class RegisterUserDto {

    constructor(
        public readonly nombre: string,
        public readonly correo: string,
        public readonly apellido: string,
        public readonly password: string,
        public readonly rol: RolUsuario,
        public readonly numeroContacto?: string,
        // data del agente inmobiliario
        public readonly experiencia?: number,
        public readonly especialidad?: string,
        public readonly ubicacion?: string,
        public readonly web?: string,
    ) {}

    static create(props: { [key: string]: any }): [string?, RegisterUserDto?] {

        const { nombre, correo, apellido, password, numeroContacto, experiencia, especialidad, ubicacion, web } = props

        const expCorreo = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
        if (!nombre) return ["El nombre es requerido"]
        if (!correo) return ["El correo es requerido"]
        if (!expCorreo.test(correo)) return ["El correo no es válido"]
        if (!apellido) return ["El apellido es requerido"]
        if (!password) return ["La contraseña es requerida"]
        const rol = props.rol as RolUsuario
        const rolesValidos = ["Usuario", "AgenteInmobiliario", "Moderador", "Administrador"]
        if (!rolesValidos.includes(rol)) return [`El rol no es válido, los roles válidos son: ${rolesValidos.join(", ")}`]

        return [undefined, new RegisterUserDto(nombre, correo, apellido, password, rol, numeroContacto, experiencia, especialidad, ubicacion, web)]
    }
}