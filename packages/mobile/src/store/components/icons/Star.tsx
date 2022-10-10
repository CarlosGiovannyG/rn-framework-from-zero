import React from "react";
import Svg, { Path,SvgProps} from "react-native-svg";

const Star = (props: SvgProps) => {
  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      
      {...props}
    >
      <Path d="M12.43 8L10 0L7.57 8H0L6.18 12.41L3.83 20L10 15.31L16.18 20L13.83 12.41L20 8H12.43Z" />
    </Svg>
  );
};

export default Star;
