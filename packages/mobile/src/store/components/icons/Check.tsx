import React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const Check = (props: SvgProps) => {
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
      d="M20 6L9 17L4 12"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
  );
};

export default Check;
