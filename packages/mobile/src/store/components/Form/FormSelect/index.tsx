import { BlockComponent } from "@my-app/app/src/framework/engine/types";
import { useStyleguide } from "@my-app/app/src/framework/styleguide/context";
import useStyles from "@my-app/app/src/framework/styleguide/hooks/useStyles";
import React, { FC, useCallback, useMemo } from "react";
import { useFormContext, Controller, ControllerRenderProps, FieldValues, ControllerFieldState, UseFormStateReturn } from "react-hook-form";
import Button from "../../ui/Button";
import { Text, View } from "react-native"
import ArrowRightSecondVariant from "../../icons/ArrowRightSecondVariant";

export const FormSelect: FC<BlockComponent<any>> = ({ props: { placeholder, name, isRequired, variant = "default", style } }) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const isInvalid = Boolean(errors[name]);

    const onChangeText = (onChange: void) => {
        return onChange;
    };

    const Select = ({ field: { onChange, value } }: {
        field: ControllerRenderProps<FieldValues, string>;
        fieldState: ControllerFieldState;
        formState: UseFormStateReturn<FieldValues>;
    }) => {
        const SelectStyle = useStyles(style)
        console.log("SelectStyle", SelectStyle)
        return (
            <Button style={SelectStyle?.button} onPress={() => {

            }}>
                <Text style={SelectStyle?.placeholder} >{placeholder}</Text>
                <View style={SelectStyle?.arrowContainer}>
                    <ArrowRightSecondVariant stroke={"#fff"} />
                </View>
            </Button>
        );
    }

    const render = useCallback(Select, [])

    return (
        <Controller
            control={control}
            rules={{
                required: isRequired,
            }}
            render={render}
            name={name}
        />
    );
}