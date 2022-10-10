import React from "react";
import Svg, { Circle, Path,SvgProps} from "react-native-svg";

const Sun = (props: SvgProps) => {
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
      <Circle cx="12" cy="12" r="5" />
      <Path d="M12 1v2" />
      <Path d="M12 21v2" />
      <Path d="M4.22 4.22l1.42 1.42" />
      <Path d="M18.36 18.36l1.42 1.42" />
      <Path d="M1 12h2" />
      <Path d="M21 12h2" />
      <Path d="M4.22 19.78l1.42-1.42" />
      <Path d="M18.36 5.64l1.42-1.42" />
    </Svg>
  );
};

export default Sun;
