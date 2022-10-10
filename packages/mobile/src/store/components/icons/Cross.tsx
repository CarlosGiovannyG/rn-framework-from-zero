import React from "react";
import Svg, { Path,SvgProps} from "react-native-svg";

const Cross = (props: SvgProps) => {
  return (
    <Svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    shapeRendering="geometricPrecision"
    {...props}
  >
    <Path d="M18 6L6 18" />
    <Path d="M6 6l12 12" />
  </Svg>
  );
};

export default Cross;
