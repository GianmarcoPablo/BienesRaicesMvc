import { SVGProps } from "react"
const Mueble = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={60}
        xmlns="http://www.w3.org/2000/svg"
        id="Layer_1"
        fill="#000"
        data-name="Layer 1"
        viewBox="0 0 24 24"
        {...props}
    >
        <g id="SVGRepo_iconCarrier">
            <defs>
                <style>
                    {
                        ".cls-1{fill:none;stroke:#020202;stroke-miterlimit:10;stroke-width:1.91px}"
                    }
                </style>
            </defs>
            <path
                d="M12 8.2v5.73H5.32V12a1 1 0 0 0-1-.95h-1V8.2a2.87 2.87 0 0 1 2.95-2.86h2.87A2.87 2.87 0 0 1 12 8.2Z"
                className="cls-1"
            />
            <path
                d="M21.55 11.07h-1.91a1 1 0 0 0-1 .95v1.91H5.32V12a1 1 0 0 0-1-.95H2.45a1 1 0 0 0-1 .95v5.73h21V12a1 1 0 0 0-.9-.93Z"
                className="cls-1"
            />
            <path
                d="M20.59 8.2v2.87h-.95a1 1 0 0 0-1 .95v1.91H12V8.2a2.87 2.87 0 0 1 2.86-2.86h2.87a2.87 2.87 0 0 1 2.86 2.86ZM2.45 19.66v-1.91M20.59 19.66v-1.91"
                className="cls-1"
            />
        </g>
    </svg>
)
export default Mueble
