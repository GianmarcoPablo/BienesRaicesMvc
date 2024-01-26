import { SVGProps } from "react"
const Location = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={60}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <g
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
        >
            <path d="M12 21c3.5-3.6 7-6.824 7-10.8C19 6.224 15.866 3 12 3s-7 3.224-7 7.2 3.5 7.2 7 10.8Z" />
            <path d="M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        </g>
    </svg>
)
export default Location
