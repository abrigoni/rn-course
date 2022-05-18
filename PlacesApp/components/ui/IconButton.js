import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const styles = StyleSheet.create({
    button: {
       padding: 8,
       justifyContent: 'center',
       alignItems: 'center',
    },
    pressed: {
      opacity: 0.7,
    }
});

const pressedButtonStyle = [styles.button, styles.pressed];

const IconButton = ({icon, size, color, onPress}) => {
    return (
        <Pressable style={({pressed}) => pressed ? styles.button : pressedButtonStyle}>
            <Ionicons name={icon} size={size} color={color} onPress={onPress} />
        </Pressable>
    );
};

export default IconButton;
