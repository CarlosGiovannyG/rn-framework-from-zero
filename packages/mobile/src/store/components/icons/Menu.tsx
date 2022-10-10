import React from "react";
import Svg, { Path,SvgProps} from "react-native-svg";

const Menu = (props: SvgProps) => {
  return (
    <Svg
      
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16m-7 6h7"
      />
    </Svg>
  );
};

export default Menu;
