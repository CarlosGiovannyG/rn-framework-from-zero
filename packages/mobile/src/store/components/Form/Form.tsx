import React, { FC, useCallback, useMemo, useState } from "react";
import { FormProvider, useForm, ValidationMode } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { object } from 'yup'
import { createYupSchema } from "./utils/buildSchemaValidation";
import { StoreFormProvider } from "./context";
import { BlockComponent } from "@my-app/app/src/framework/engine/types";
import useChildren from "@my-app/app/src/framework/engine/hooks/useChildren";
import { parseResponse } from "@my-app/app/src/framework/omni-logic/plugin/hook/use-omni-hook";
import useStyles from "@my-app/app/src/framework/styleguide/hooks/useStyles";
import { ScrollView, View } from "react-native";
import { useExtension } from "@my-app/app/src/framework/engine/extension/context";

interface FormProps {
  mode?: keyof ValidationMode | undefined
  reValidateMode?: "onBlur" | "onChange" | "onSubmit"
  defaultValues: any
  scrollView?: boolean
  schemaValidation: any
  style?: string
}

export const Form: FC<BlockComponent<FormProps>> = ({ children, componentName, props }) => {
  const [isLoading, setLoading] = useState(false);
  const childrens = useChildren({ children })
  const { hooks } = useExtension();

  const { schemaValidation, mode, reValidateMode, defaultValues } = props

  const yepSchema = useMemo(
    () => object().shape(schemaValidation?.reduce(createYupSchema, {})),
    []
  );
  const FormStyles = useStyles(props.style)
  const methods = useForm({
    mode: mode ? mode : 'onSubmit',
    reValidateMode: reValidateMode
      ? reValidateMode
      : 'onChange',
    defaultValues: defaultValues
      ? defaultValues
      : defaultValues,
    resolver: yupResolver(yepSchema),
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: undefined,
  });
  const onSubmit = async (formValues: { [x: string]: unknown }) => {
    const parsedResponses = parseResponse(formValues, props.parseInput);
    const submit = hooks[props.context]

    setLoading(true);
    const response = await submit({
      ...parsedResponses,
      hooks
    })
    setLoading(false);
  }

  const Render = useCallback(() => {
    if (props?.scrollView) {
      return <ScrollView style={[{ flex: 1 }, FormStyles?.container]}>
        {childrens}
      </ScrollView>
    }
    return  <View style={FormStyles?.container}>
      {childrens}
      </View>
  }, [props?.scrollView, FormStyles?.container])

  return (
    <FormProvider {...methods}>
      <StoreFormProvider config={{
        onSubmit,
        defaultValues: {},
        submitIsLoading: isLoading,
      }}>
       
          <Render />
  
      </StoreFormProvider>
    </FormProvider>
  );
}