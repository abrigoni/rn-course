import { useLayoutEffect, useContext } from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { MEALS } from '../data/dummy-data';
import MealDetails from '../components/MealDetails';
import Subtitle from '../components/MealDetail/Subtitle';
import List from '../components/MealDetail/List';
import IconButton from '../components/IconButton';
// import { FavoritesContext } from '../store/context/favorites-context';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/redux/favorites';

function MealDetailScreen({ route, navigation }) {
    // const favoriteMealsCtx = useContext(FavoritesContext);
    const favoriteMealsIds = useSelector(state => state.favoriteMeals.ids);
    const dispatch = useDispatch();
    const mealId = route.params.mealId;
    const selectedMeal = MEALS.find(m => m.id = mealId);


    // const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);
    const mealIsFavorite = favoriteMealsIds.includes(mealId);
    function headerButtonPressHandler() {
        if (mealIsFavorite) {
            // favoriteMealsCtx.removeFavorite(mealId);
            dispatch(removeFavorite({id: mealId}));
        } else {
            // favoriteMealsCtx.addFavorite(mealId);
            dispatch(addFavorite({id: mealId}));
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <IconButton onPress={headerButtonPressHandler} color="white" icon={mealIsFavorite ? "star" : "star-outline"} />;
            }
        });
    }, [navigation, headerButtonPressHandler]);
    return (
        <ScrollView style={styles.rootContainer}>
            <Image style={styles.image} source={{uri: selectedMeal.imageUrl}}/>
            <Text style={styles.title}>
                {selectedMeal.title}
            </Text>
            <MealDetails
                affordability={selectedMeal.affordability}
                duration={selectedMeal.duration}
                complexity={selectedMeal.complexity}
                textStyle={styles.detailText}
            />
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingredients</Subtitle>
                    <List data={selectedMeal.ingredients} />
                    <Subtitle>Steps</Subtitle>
                    <List data={selectedMeal.steps} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32,
    },
    image: {
        width: '100%',
        height: 350,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white',
    },
    detailText: {
        color: 'white',
    },
    listOuterContainer: {
        alignItems: 'center',
    },
    listContainer: {
        width: '80%',
    },
});

export default MealDetailScreen;