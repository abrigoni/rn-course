import { useLayoutEffect } from 'react';
import MealItem from '../components/MealItem';
import MealsList from '../components/MealsList/MealsList';
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
    

    return (
        <MealsList items={displayedMeals} />
    )
};


export default MealsOverviewScreen;