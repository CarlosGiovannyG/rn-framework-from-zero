import React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";
const ArrowLeft = (props: SvgProps) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      {...props}
    >
      <Path
        d="M19 12H5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 19L5 12L12 5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg> 
  );
};

export default ArrowLeft;
