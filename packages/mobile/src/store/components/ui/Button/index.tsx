import React, { FC } from "react";
import { Insets, StyleProp, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import ButtonLoading from "./Loading";

interface ButtonProps {
    isLoading?: boolean;
    text?: string;
    onPress: (...args: any) => any;
    style?: StyleProp<ViewStyle>;
    hitSlop?: Insets | undefined;
    children: React.ReactNode
    disabled?: boolean
}

const Button: FC<ButtonProps> = ({
    isLoading,
    children,
    onPress,
    style,
    hitSlop,
    disabled = false,
    text
}) => {

    return (
        <TouchableOpacity disabled={isLoading || disabled}
            hitSlop={hitSlop}
            style={style}
            onPress={onPress}
        >
            {isLoading ? <ButtonLoading /> : children}
        </TouchableOpacity>
    );
};


export default Button