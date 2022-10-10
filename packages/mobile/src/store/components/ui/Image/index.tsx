import React, { FC, useCallback } from "react";
import { Image as RNImage, ImageStyle, StyleProp } from "react-native";

export interface ImageProps {
  width: string | number;
  height: string | number;
  resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
  src: string;
  style?: StyleProp<ImageStyle>;
}

const Image: FC<ImageProps> = ({
  width = "100%",
  height = "100%",
  resizeMode = "contain",
  src,
  style
}) => {


  return <RNImage
    style={[{
      width: width,
      height: height,
    }, style]}
    source={{ uri: src }}
    resizeMode={resizeMode}
  />

};

export default Image