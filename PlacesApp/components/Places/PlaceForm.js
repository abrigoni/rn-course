import {useCallback, useState} from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import {Colors} from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../ui/Button";
import { Place } from '../../models/place';


const styles = StyleSheet.create({
   form: {
       flex: 1,
       padding: 24,
   },
   label: {
       fontWeight: 'bold',
       marginBottom: 4,
       color: Colors.primary500,
   },
   input: {
       marginVertical: 8,
       paddingHorizontal: 4,
       paddingVertical: 8,
       fontSize: 16,
       borderBottomColor: Colors.primary500,
       borderBottomWidth: 2,
       backgroundColor: Colors.primary100,
   },
});

const PlaceForm = ({onCreatePlace}) => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [pickedLocation, setPickedLocation] = useState();

    const changeTitleHandler = (enteredText) => {
        setEnteredTitle(enteredText);
    };

    const takeImageHandler = (imageUri) => {
        setSelectedImage(imageUri);
    };

    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location);
    }, [])
    const savePlaceHandler = () => {
        const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
        onCreatePlace(placeData);
    };
    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle} />
            </View>
            <ImagePicker onImageTaken={takeImageHandler} />
            <LocationPicker onLocationPick={pickLocationHandler} />
            <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
    );
};

export default PlaceForm;
