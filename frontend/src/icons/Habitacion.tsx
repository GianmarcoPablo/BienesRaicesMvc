import { SVGProps } from "react"
const Habitacion = (props: SVGProps<SVGSVGElement>) => (
    <svg
        height={60}
        width={60}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path d="M21 12.184V4a1 1 0 0 0-2 0v1H5V4a1 1 0 0 0-2 0v8.184A3 3 0 0 0 1 15v5a1 1 0 0 0 2 0v-1h18v1a1 1 0 0 0 2 0v-5a3 3 0 0 0-2-2.816ZM19 12h-1v-2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2H5V7h14ZM8 12v-1h3v1Zm5-1h3v1h-3ZM3 15a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2H3Z" />
    </svg>
)
export default Habitacion
