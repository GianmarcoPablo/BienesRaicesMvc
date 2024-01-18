

export class CrearTerrenoDTO {
    constructor(
        public readonly area: number,
        public readonly precio: number,
        public readonly superficie: number,
        public readonly tipoSuelo: string,
        public readonly direccion: string,
        public readonly fotos: string[],
        public readonly descripcion?: string,
        public readonly extras?: string[],
    ) { }

    static create(props: { [key: string]: any }): [string?, CrearTerrenoDTO?] {

        const { area, precio, superficie, tipoSuelo, direccion, fotos, descripcion, extras } = props

        if (!area) return ["El área es requerida"]
        if (!precio) return ["El precio es requerido"]
        if (!superficie) return ["La superficie es requerida"]
        if (!tipoSuelo) return ["El tipo de suelo es requerido"]
        if (!direccion) return ["La dirección es requerida"]

        return [
            undefined,
            new CrearTerrenoDTO(
                area,
                precio,
                superficie,
                tipoSuelo,
                direccion,
                fotos,
                descripcion,
                extras
            )
        ]
    }
}