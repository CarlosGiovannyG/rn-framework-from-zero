import { NativeSyntheticEvent, TextInputFocusEventData, TextInputSubmitEditingEventData, TextStyle, ViewStyle,TextInput } from "react-native";

interface TextInputProps {
    submitRightIcon?: boolean;
    submitLeftIcon?: boolean;
    disableValidation?: boolean;
    isInvalid?: boolean;
    onChange?: (...event: any[]) => void;
    onSubmitEditing?:
    | ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void)
    | undefined;
    onFocus?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
    onBlur?: (...event: any[]) => void;
    onChangeText?: (...event: any[]) => void;
    value?: string;
    styles: {
        [x: string]: TextStyle | ViewStyle;
    };
    rightComponent?: React.ReactElement | null;
    leftComponent?: React.ReactElement | null;
    deleteIconComponent?: React.ReactElement | null;

    rightIcon?: boolean;
    leftIcon?: boolean;
    isPassword?: boolean;
    deleteButton?: boolean;

    keyboardType?: string;
    successIcon?: boolean;
    maxLength?: number;
    placeholder?: string;
    placeholderTextColor?: string
    showPassword?: boolean
    editable?: boolean;
    componentRef?: React.LegacyRef<TextInput>
}


export type {
    TextInputProps
}