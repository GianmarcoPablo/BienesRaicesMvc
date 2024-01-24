import { SVGProps } from "react"
const Baños = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={60}
        height={60}
        xmlns="http://www.w3.org/2000/svg"
        className="icon flat-line"
        data-name="Flat Line"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            d="M11 10H5V9a3 3 0 0 1 3-3 3 3 0 0 1 3 3Z"
            style={{
                fill: "#000",
                strokeWidth: 2,
            }}
        />
        <path
            d="M17 21V5a2 2 0 0 0-2-2h-5a2 2 0 0 0-2 2v1"
            style={{
                fill: "none",
                stroke: "#000",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
            }}
        />
        <path
            d="M11 10H5V9a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3Zm4 11h4M6 14v2m4-2v2"
            data-name="primary"
            style={{
                fill: "none",
                stroke: "#000",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
            }}
        />
    </svg>
)
export default Baños
