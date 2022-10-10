import { BlockComponent } from "@my-app/app/src/framework/engine/types";
import { useStyleguide } from "@my-app/app/src/framework/styleguide/context";
import useStyles from "@my-app/app/src/framework/styleguide/hooks/useStyles";
import React, { FC, memo, useCallback, useMemo } from "react";
import { useFormContext, Controller, ControllerRenderProps, FieldValues, ControllerFieldState, UseFormStateReturn } from "react-hook-form";
import TextInput from "../../ui/Input/Input";
import { FormInputProps } from "./types";
import { InputVariants } from "./Variants";
import isEqual from 'lodash.isequal'

const FormInput: FC<BlockComponent<FormInputProps>> = ({ props: { placeholder, name, isRequired, variant = "default", style, ...rest } }) => {

  const {
    control
  } = useFormContext();

  const onChangeText = (onChange: void) => {
    return onChange;
  };

  const Input = useCallback(({ field: { onChange, value } }: {
    field: ControllerRenderProps<FieldValues, string>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<FieldValues>;
  }) => {
    const {
      formState: { errors },
    } = useFormContext();

    const InputStyle = useStyles(style)
    const InputVariant = useMemo(() => InputVariants[variant], [variant])
    const isInvalid = errors[name]
    return (
      <InputVariant
        placeholder={placeholder}
        styles={InputStyle}
        isInvalid={isInvalid}
        onChangeText={(text: string) => {
          return onChangeText(onChange(text));
        }}
        value={value}
        {...rest}
      />
    );
  }, [])

  return (
    <Controller
      control={control}
      rules={{
        required: isRequired,
      }}
      render={Input}
      name={name}
    />
  );
}



export default memo(FormInput,isEqual)