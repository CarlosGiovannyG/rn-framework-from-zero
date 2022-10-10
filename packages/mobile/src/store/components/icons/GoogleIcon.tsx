import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

const GoogleIcon = (props: SvgProps) => {
    return (<Svg
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.54 12.261c0-.815-.073-1.6-.21-2.352H11.5v4.449h6.19a5.29 5.29 0 0 1-2.296 3.47v2.886h3.717c2.174-2.002 3.429-4.95 3.429-8.452Z"
            fill="#4285F4"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.5 23.5c3.104 0 5.708-1.03 7.61-2.786l-3.716-2.886c-1.03.69-2.347 1.098-3.895 1.098-2.995 0-5.53-2.023-6.434-4.741H1.223v2.98A11.496 11.496 0 0 0 11.5 23.5Z"
            fill="#34A853"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.065 14.185A6.913 6.913 0 0 1 4.705 12c0-.758.13-1.495.36-2.185v-2.98H1.223A11.495 11.495 0 0 0 0 12c0 1.856.444 3.612 1.223 5.165l3.842-2.98Z"
            fill="#FBBC05"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.5 5.074c1.688 0 3.204.58 4.396 1.72l3.298-3.299C17.202 1.64 14.599.5 11.5.5A11.496 11.496 0 0 0 1.223 6.835l3.842 2.98c.904-2.718 3.44-4.741 6.434-4.741Z"
            fill="#EA4335"
        />
    </Svg>)
}

export default GoogleIcon
