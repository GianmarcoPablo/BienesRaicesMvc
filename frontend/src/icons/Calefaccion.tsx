import { SVGProps } from "react"
const Calefaccion = (props: SVGProps<SVGSVGElement>) => (
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
            <rect
                width={21}
                height={4.77}
                x={1.5}
                y={1.5}
                className="cls-1"
                rx={2.39}
            />
            <path d="M2.45 6.27h19.09V22.5H2.45z" className="cls-1" />
            <path
                d="M12 10.09a5.73 5.73 0 0 1 5.73 5.73v6.68H6.27v-6.68A5.73 5.73 0 0 1 12 10.09Z"
                className="cls-1"
            />
            <path
                d="M14.86 19.64a2.86 2.86 0 0 1-5.72 0c0-1.59 2.86-4.78 2.86-4.78s2.86 3.19 2.86 4.78Z"
                className="cls-1"
            />
            <path
                d="M13.43 21.07a1.43 1.43 0 0 1-2.86 0c0-.79 1.43-2.39 1.43-2.39s1.43 1.6 1.43 2.39Z"
                style={{
                    fill: "#020202",
                }}
            />
            <path d="M.55 22.5h22.9" className="cls-1" />
        </g>
    </svg>
)
export default Calefaccion
