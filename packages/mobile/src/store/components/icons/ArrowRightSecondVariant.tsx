import React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const ArrowRightSecondVariant = (props: SvgProps) => {
  return (
    <Svg
    width={5}
    height={8}
    fill="none"
    {...props}
  >
    <Path
      d="M.556 8a.587.587 0 0 1-.393-.147.465.465 0 0 1 0-.706L3.659 4 .163.853a.465.465 0 0 1 0-.706.599.599 0 0 1 .785 0l3.889 3.5a.465.465 0 0 1 0 .706l-3.889 3.5A.587.587 0 0 1 .556 8Z"
      fill="#fff"
    />
  </Svg>
  );
};
export default ArrowRightSecondVariant;
