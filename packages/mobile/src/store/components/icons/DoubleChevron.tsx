import React from "react";
import Svg, { Path,SvgProps} from "react-native-svg";

const DoubleChevron = (props: SvgProps) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      
      {...props}
    >
      <Path
        d="M16 8.90482L12 4L8 8.90482M8 15.0952L12 20L16 15.0952"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default DoubleChevron;
