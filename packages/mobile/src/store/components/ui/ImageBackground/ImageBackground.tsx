import CookieManager from "@react-native-cookies/cookies";
import React, { FC } from "react";
import { ImageBackground, ImageBackgroundProps } from "react-native";

export const ImageBackgroundComponent: FC<ImageBackgroundProps> = ({ children, ...rest }) => {
  return (
    <ImageBackground {...rest}>
      {children}
    </ImageBackground>
  );
}