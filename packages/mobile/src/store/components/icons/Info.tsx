import React from "react";
import Svg, { Circle, Path,SvgProps} from "react-native-svg";

const Info = (props: SvgProps) => {
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
      <Circle cx="12" cy="12" r="10" fill="transparent" />
      <Path d="M12 8v4" stroke="currentColor" />
      <Path d="M12 16h.01" stroke="currentColor" />
    </Svg>
  );
};

export default Info;
