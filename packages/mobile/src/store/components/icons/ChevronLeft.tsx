import React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const ChevronLeft = (props: SvgProps) => {
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
    <Path d="M15 18l-6-6 6-6" />
  </Svg>
  );
};

export default ChevronLeft;
