import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const PasswordRules = () => {
    const rules = [{
        "id": "email",
        "type": "text",
        "validationType": "string",
        "validations": [
            {
                "type": "required",
                "params": ["El correo electrónico es requerido"]
            },
            { "type": "email", "params": ["Debe ser un email válido"] }
        ]
    }
    ]
    return <View>
        <Text style={defaultStyles.text}>
            {`Tu contraseña debe contener mínimo 8 caracteres

            1 número
            1 mayúscula
            1 minúscula
            1 caracter especial #*@$ (Opcional)
            `}
        </Text>
    </View>
}

const defaultStyles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: '#B3B3B3'
    }
})

export default PasswordRules