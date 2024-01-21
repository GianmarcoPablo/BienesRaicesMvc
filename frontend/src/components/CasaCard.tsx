
export default function CasaCard({ casa }) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
            <img
                className="w-full h-48 object-cover"
                src={casa.fotos[0]} // Así asumo que la primera foto es la principal, ajusta según tus necesidades
                alt={casa.descripcion}
            />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{casa.tipo}</div>
                <p className="text-gray-700 text-base">{casa.descripcion}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    Precio: ${casa.precio}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    Habitaciones: {casa.habitaciones}
                </span>
            </div>
            <div className="px-6 pt-4 pb-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Ver Más
                </button>
            </div>
        </div>
    );
}
