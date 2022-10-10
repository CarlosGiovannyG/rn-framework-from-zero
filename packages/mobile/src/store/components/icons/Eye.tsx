import React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";


const Eye = (props: SvgProps) => {
  return (
    <Svg
      width={22}
      height={15}
      fill="none"
      {...props}
    >
      <Path
        d="M11 2a9.77 9.77 0 0 1 8.82 5.5A9.77 9.77 0 0 1 11 13a9.77 9.77 0 0 1-8.82-5.5A9.77 9.77 0 0 1 11 2Zm0-2C6 0 1.73 3.11 0 7.5 1.73 11.89 6 15 11 15s9.27-3.11 11-7.5C20.27 3.11 16 0 11 0Zm0 5a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5Zm0-2C8.52 3 6.5 5.02 6.5 7.5S8.52 12 11 12s4.5-2.02 4.5-4.5S13.48 3 11 3Z"
        fill="#1A1919"
      />
    </Svg>
  );
};



export default Eye;
