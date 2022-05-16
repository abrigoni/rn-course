import {View, StyleSheet, Text} from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import {GlobalStyles} from "../constants/styles";
import {useMemo} from "react";


const ExpensesOutput = ({expenses, expensesPeriod, fallbackText}) => {
    const renderContent = useMemo(() => {
        return expenses.length > 0 ? <ExpensesList expenses={expenses}/> : <Text style={styles.infoText}>{fallbackText}</Text>;
    }, [expenses, fallbackText]);

    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            {renderContent}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
    },
})

export default ExpensesOutput;
