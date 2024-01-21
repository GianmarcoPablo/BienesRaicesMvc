export default function formatarFecha(fechaISO: string): string {
    const fecha = new Date(fechaISO);

    const opciones: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC',
    };

    return fecha.toLocaleDateString('es-ES', opciones);
}
