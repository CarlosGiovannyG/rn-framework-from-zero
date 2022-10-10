import React from "react";
import { Rect, SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const CreditCard = (props: SvgProps) => {
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
    <Rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <Path d="M1 10h22" />
  </Svg>
  );
};

export default CreditCard;
