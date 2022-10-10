import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput as RNTextInput } from 'react-native';
import TextInput from './Input';

type OtpCodeTypes = {
    code: string;
    setCode: (...args: any) => void;
    maximumLength: number;
    setIsPinReady: (...args: any) => void;
    styles: StyleSheet.NamedStyles<any>
}

const OtpCode: FC<OtpCodeTypes> = ({ code, setCode, maximumLength, setIsPinReady, styles }) => {
    const boxArray = new Array(maximumLength).fill(0);
    const inputRef = useRef<RNTextInput>(null);

    const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

    const handleOnPress = () => {
        setIsInputBoxFocused(true);
        inputRef?.current?.focus();
    };

    const handleOnBlur = () => {
        setIsInputBoxFocused(false);
    };

    useEffect(() => {
        // update pin ready status
        setIsPinReady(code.length === maximumLength);
        // clean up function
        return () => {
            setIsPinReady(false);
        };
    }, [code]);


    const boxDigit = (_: any, index: number) => {
        const emptyInput = "";
        const digit = code[index] || emptyInput;

        const isCurrentValue = index === code.length;
        const isLastValue = index === maximumLength - 1;
        const isCodeComplete = code.length === maximumLength;

        const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

        const StyledSplitBoxes =
            isInputBoxFocused && isValueFocused ? DefaultStyles.SplitBoxesFocused : DefaultStyles.SplitBoxes;
        return (
            <View style={StyledSplitBoxes} key={index}>
                <Text style={DefaultStyles.SplitBoxText}>{digit}</Text>
            </View>
        );
    };

    console.log(styles)

    return (
        <View style={[DefaultStyles.OTPInputContainer, styles?.OTPInputContainer]}>
            <Pressable style={DefaultStyles.SplitOTPBoxesContainer} onPress={handleOnPress}>
                {boxArray.map(boxDigit)}
            </Pressable>
            <TextInput
                styles={DefaultStyles.TextInputHidden}
                value={code}
                onChangeText={setCode}
                maxLength={maximumLength}
                componentRef={inputRef}
                onBlur={handleOnBlur}
            />
        </View>
    );
};



const DefaultStyles = StyleSheet.create({
    OTPInputContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    TextInputHidden: {
        borderColor: "#e5e5e5",
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        marginTop: 50,
        position: 'absolute',
        opacity: 0
    },
    SplitOTPBoxesContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    SplitBoxes: {
        borderColor: "#e5e5e5",
        borderWidth: 1,
        borderRadius: 16,
        justifyContent: "center",
        width: 54,
        height: 50,
        marginHorizontal: 2
    },
    SplitBoxText: {
        fontSize: 20,
        textAlign: "center",
        color: "#e5e5e5"
    },
    SplitBoxesFocused: {
        borderColor: "#390052",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 16,
        width: 54,
        height: 50
    },
})

export default OtpCode