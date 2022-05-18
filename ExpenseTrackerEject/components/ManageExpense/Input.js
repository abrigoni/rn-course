import { View, TextInput, Text, StyleSheet } from 'react-native';
import {GlobalStyles} from "../../constants/styles";
import {useMemo} from "react";

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4,
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        color: GlobalStyles.colors.primary700,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500,
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50,
    },
});

// const multilineStyle = [styles.input, styles.inputMultiline];

const Input = ({label, invalid, style, textInputConfig}) => {
    const inputStyle = useMemo(() => textInputConfig.multiline ? [styles.input, styles.inputMultiline, invalid && styles.invalidInput] : [styles.input, invalid && styles.invalidInput], [textInputConfig.multiline, invalid]);
    const inputContainerStyle = useMemo(() => !!style ? [styles.inputContainer, style] : styles.inputContainer, [style]);
    const labelStyle = useMemo(() => invalid ? [styles.label, styles.invalidLabel] : styles.label, [invalid]);
    return (
        <View style={inputContainerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput {...textInputConfig} style={inputStyle} placeholder={textInputConfig.placeholder} />
        </View>
    )
};

export default Input;
