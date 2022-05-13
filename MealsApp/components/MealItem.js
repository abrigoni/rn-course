import { View, Text, StyleSheet, Pressable, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MealDetails from './MealDetails';

function MealItem({ id, title, imageUrl, duration, complexity, affordability }) {
    const navigation = useNavigation();

    function selectMealHandler() {
        navigation.navigate('MealDetail', { mealId: id });
    };
    return (
        <View style={styles.mealItem}>
            <Pressable
                android_ripple={{color: '#ccc'}}
                style={({pressed}) => pressed && styles.buttonPressed}
                onPress={selectMealHandler}
            >
                <View style={styles.innerContainer}>
                    <View>
                        <Image style={styles.image} source={{ uri: imageUrl }}  />
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <MealDetails affordability={affordability} duration={duration} complexity={complexity} />
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    mealItem: {
        margin: 16,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'white',
        elevation: 4,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: .25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    innerContainer: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    buttonPressed: {
        opacity: 0.25,
    },
    image: {
        width: '100%',
        height: 200,
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        margin: 8,
    },
});

export default MealItem; 