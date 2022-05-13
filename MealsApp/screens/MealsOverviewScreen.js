import { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MealItem from '../components/MealItem';
import { MEALS, CATEGORIES } from '../data/dummy-data';

function MealsOverviewScreen({ navigation, route }) {
    const catId = route.params.categoryId;
    const displayedMeals = MEALS.filter((m) => {
        return m.categoryIds.indexOf(catId) >= 0;
    });

    useLayoutEffect(() => {
        const categoryTitle = CATEGORIES.find((c) => c.id === catId).title;
        navigation.setOptions({
            title: categoryTitle,
        });
    }, [catId, navigation])
    function renderMealItem(itemData) {
        const item = itemData.item;
        const mealItemProps = {
            id: item.id,
            title: item.title,
            imageUrl: item.imageUrl,
            complexity: item.complexity,
            affordability: item.affordability,
            duration: item.duration,
        };
        return <MealItem {...mealItemProps} />
        // return (
        //     <MealItem
        //         {...itemData.item}
        //     />
        // );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={displayedMeals}
                keyExtractor={(item) => item.id}
                renderItem={renderMealItem}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});

export default MealsOverviewScreen;