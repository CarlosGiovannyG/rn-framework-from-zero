import React from "react";
import Svg, { Circle, Path,SvgProps} from "react-native-svg";

const Minus = (props: SvgProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M5 12H19"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
  );
};

export default Minus;
