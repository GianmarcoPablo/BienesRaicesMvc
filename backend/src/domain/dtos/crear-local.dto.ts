
export enum TipoTransaccion {
    Venta = "Venta",
    Alquiler = "Alquiler"
}
export enum Antiguedad {
    MenosDe1 = "MenosDe1",
    Entre1Y5 = "Entre1Y5",
    Entre5Y10 = "Entre5Y10",
    Entre10Y20 = "Entre10Y20",
    MasDe20 = "MasDe20"
}

export class CrearLocalDto {
    constructor(
        public readonly tipoTransaccion: TipoTransaccion,
        public readonly precio: number,
        public readonly superficie: number,
        public readonly direccion: string,
        public readonly fotos: string[],
        public readonly extras: string[],
        public readonly antiguedad: Antiguedad,
        public readonly descripcion?: string,
    ) { }

    static create(obj: { [key: string]: any }): [string?, CrearLocalDto?] {
        const { tipoTransaccion, precio, superficie, direccion, fotos, extras, antiguedad, descripcion } = obj

        if (!tipoTransaccion) return ["Tipo de transaccion no especificado"]
        if (!precio) return ["Precio no especificado"]
        if (!superficie) return ["Superficie no especificada"]
        if (!direccion) return ["Direccion no especificada"]
        if (!antiguedad) return ["Antiguedad no especificada"]

        return [undefined, new CrearLocalDto(tipoTransaccion, precio, superficie, direccion, fotos, extras, antiguedad, descripcion)]
    }
}