import React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";
const ArrowDown = (props: SvgProps) => {
  return (
    <Svg
      width={10}
      height={7}
      fill="none"
      {...props}
    >
      <Path
        d="M.005.731A.688.688 0 0 1 .185.26a.596.596 0 0 1 .883-.006l3.958 4.17L8.93.203a.596.596 0 0 1 .883-.006c.246.259.249.681.006.942L5.478 5.834a.596.596 0 0 1-.883.005L.19 1.201a.688.688 0 0 1-.186-.47Z"
        fill="#390052"
      />
    </Svg>
  );
};



export default ArrowDown;
