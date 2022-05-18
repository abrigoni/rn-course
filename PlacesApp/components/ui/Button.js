import { StyleSheet, Pressable, View, Text } from 'react-native';
import {Colors} from "../../constants/colors";

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
        backgroundColor: Colors.primary800,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: .25,
        shadowOffset: { height: 1, width: 1},
        shadowRadius: 2,
        borderRadius: 4,
    },
    pressed: {
        opacity: 0.7
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        color: Colors.primary50,
    }
});

const pressedButtonStyle = [styles.button, styles.pressed];

const Button = ({children, onPress}) => {
    return (
        <Pressable
            onPress={onPress}
            style={({pressed}) => pressed ? styles.button : pressedButtonStyle}
        >
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
};

export default Button;
