import {useState} from "react";
import { View, Button, Alert, Image, Text, StyleSheet } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import {Colors} from "../../constants/colors";
import OutlinedButton from "../ui/OutlinedButton";



const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

const ImagePicker = ({onImageTaken}) => {
    const [pickedImage, setPickedImage] = useState();
    const [cameraPermissionsInformation, requestPermission] = useCameraPermissions();

    const verifyPermissions = async () => {
        if (cameraPermissionsInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (cameraPermissionsInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant camera permissions to use this app.'
            );
            return false;
        }
        return true;
    };
    const takeImageHandler = async () => {
        const hasPermissions = await verifyPermissions();

        if (!hasPermissions) {
            return;
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        setPickedImage(image.uri);
        onImageTaken(image.uri);
    };
    return (
        <View>
            <View style={styles.imagePreview}>
                {!!pickedImage ? <Image source={{uri: pickedImage}} style={styles.image}/> : <Text>No image taken yet.</Text>}
            </View>
            <OutlinedButton icon={"camera"} onPress={takeImageHandler}>Take Image</OutlinedButton>
        </View>
      );
};

export default ImagePicker;
