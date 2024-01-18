

export enum TipoPropiedad {
    Casa = "Casa",
    Apartamento = "Apartamento",
}

export enum TipoTransaccion {
    Venta = "Venta",
    Alquiler = "Alquiler"
}

export enum Estado {
    CasiNuevo = "CasiNuevo",
    MuyBien = "MuyBien",
    Bien = "Bien",
    AReformar = "AReformar",
    Reformado = "Reformado"
}

export enum Antiguedad {
    MenosDe1 = "MenosDe1",
    Entre1Y5 = "Entre1Y5",
    Entre5Y10 = "Entre5Y10",
    Entre10Y20 = "Entre10Y20",
    MasDe20 = "MasDe20"
}



export class CrearApartamentoDto {
    constructor(
        public readonly tipo: TipoPropiedad,
        public readonly ubicacion: string,
        public readonly precio: number,
        public readonly superficie: number,
        public readonly habitaciones: number,
        public readonly bathrooms: number,
        public readonly estado: Estado,
        public readonly antiguedad: Antiguedad,
        public readonly fotos: string[],
        public readonly tipoTransaccion: TipoTransaccion,
        public readonly fechaPublicacion: Date,
        public readonly numPisos?: number,
        public readonly descripcion?: string,
        public readonly ascensor?: boolean,
        public readonly seguridad?: boolean,
        public readonly piscina?: boolean,
        public readonly cocina?: boolean,
        public readonly parqueadero?: boolean,
        public readonly jardin?: boolean,
        public readonly amoblado?: boolean,
        public readonly balcon?: boolean,
        public readonly terraza?: boolean,
        public readonly calefaccion?: boolean,
    ) { }

    static create(props: { [key: string]: any }): [string?, CrearApartamentoDto?] {
        const { tipo, ubicacion, precio, superficie, habitaciones, bathrooms, estado, antiguedad, fotos, tipoTransaccion, fechaPublicacion, descripcion, ascensor, seguridad, piscina, cocina, parqueadero, jardin, amoblado, balcon, terraza, calefaccion, numPisos } = props

        if (!tipo) return ["El tipo de propiedad es requerido"]
        if (!ubicacion) return ["La ubicación es requerida"]
        if (!precio) return ["El precio es requerido"]
        if (!superficie) return ["La superficie es requerida"]
        if (!habitaciones) return ["El número de habitaciones es requerido"]
        if (!bathrooms) return ["El número de baños es requerido"]
        if (!estado) return ["El estado es requerido"]
        if (!antiguedad) return ["La antiguedad es requerida"]


        return [
            undefined,
            new CrearApartamentoDto(
                tipo,
                ubicacion,
                precio,
                superficie,
                habitaciones,
                bathrooms,
                estado,
                antiguedad,
                fotos,
                tipoTransaccion,
                fechaPublicacion,
                numPisos,
                descripcion,
                ascensor,
                seguridad,
                piscina,
                cocina,
                parqueadero,
                jardin,
                amoblado,
                balcon,
                terraza,
                calefaccion,
            )
        ]
    }
}