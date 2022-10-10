import { BlockComponent } from '@my-app/app/src/framework/engine/types';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import React, { FC, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import OtpCode from '../../../ui/Input/OtpCode';

const OtpCodeInput: FC<any> = ({ styles, value, onChangeText }) => {
    const [otpCode, setOTPCode] = useState("");
    const [isPinReady, setIsPinReady] = useState(false);

    useEffect(()=> {
        if(isPinReady && otpCode.length){
            onChangeText(otpCode)
        }
    }, [isPinReady])
    
    return <OtpCode
        styles={styles}
        code={otpCode}
        setCode={setOTPCode}
        maximumLength={6}
        setIsPinReady={setIsPinReady}
    />
}

export default OtpCodeInput