import {View, StyleSheet, Alert, Image, Text} from 'react-native';
import {getCurrentPositionAsync, useForegroundPermissions, PermissionStatus} from "expo-location";
import OutlinedButton from "../ui/OutlinedButton";
import {Colors} from "../../constants/colors";
import {getAddress, getMapPreview} from "../../utils/location";
import {useEffect, useState} from "react";
import {useNavigation, useRoute, useIsFocused} from "@react-navigation/native";

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 4,
    },
});

const LocationPicker = ({onLocationPick}) => {
    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();
    const [pickedLocation, setPickedLocation] = useState();
    const [locationPermissionInformation, requestPermissions] = useForegroundPermissions();

    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = {
                lat: route.params?.pickedLat,
                lng: route.params?.pickedLng
            };
            setPickedLocation(mapPickedLocation);
        }
    }, [route, isFocused]);

    useEffect(() => {
        const handleLocation = async () => {
            if (pickedLocation) {
                const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
                onLocationPick({...pickedLocation, address});
            }
        };
        handleLocation();
    }, [pickedLocation, onLocationPick]);

    const verifyPermissions = async () => {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermissions();
            return permissionResponse.granted;
        }
        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant location permissions to use this app.'
            );
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const location = await getCurrentPositionAsync();
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
    };

    const pickOnMapHandler = () => {
        navigation.navigate('Map');
    };
    return (
        <View>
            <View style={styles.mapPreview}>
                {pickedLocation ? <Image style={styles.image} source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)}} /> : <Text>No location picked yet.</Text>}

            </View>
            <View style={styles.actions}>
                <OutlinedButton icon={'location'} onPress={getLocationHandler}>Locate User</OutlinedButton>
                <OutlinedButton icon={'map'} onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
            </View>
        </View>
    );
};

export default LocationPicker;
