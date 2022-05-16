import { Text, View, StyleSheet } from 'react-native';
import {useContext, useLayoutEffect} from "react";
import IconButton from "../components/ui/IconButton";
import Button from "../components/ui/Button";
import {GlobalStyles} from "../constants/styles";
import {ExpensesContext} from "../store/expenses-context";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    },
});

const ManageExpenses = ({ route, navigation }) => {
    const expensesCtx = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const deleteExpenseHandler = () => {
        expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    };

    const cancelHandler = () => {
        navigation.goBack();
    };

    const confirmHandler = () => {
        if (isEditing) {
            expensesCtx.updateExpense(
                editedExpenseId,
                {
                    description: 'test',
                    amount: 19.99,
                    date: new Date('2022-05-19')
                }
            );
        } else {
            expensesCtx.addExpense({
                description: 'test',
                amount: 19.99,
                date: new Date('2022-05-19')
            });
        }
        navigation.goBack();
    };


    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Button
                    style={styles.button}
                    mode={"flat"}
                    onPress={cancelHandler}
                >
                    Cancel
                </Button>
                <Button
                    style={styles.button}
                    onPress={confirmHandler}
                >
                    {isEditing ? 'Update' : 'Add'}
                </Button>
            </View>
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton icon={"trash"} color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler}/>
                </View>
            )}
        </View>
    );
};

export default ManageExpenses;
