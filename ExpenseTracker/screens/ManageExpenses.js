import { View, StyleSheet } from 'react-native';
import {useContext, useLayoutEffect, useMemo, useState} from "react";
import IconButton from "../components/ui/IconButton";
import Button from "../components/ui/Button";
import {GlobalStyles} from "../constants/styles";
import {ExpensesContext} from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {deleteExpense, storeExpense, updateExpense} from "../utils/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
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
    const [error, setError] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const expensesCtx = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;
    const selectedExpense = useMemo(() => expensesCtx.expenses.find(expense => expense.id === editedExpenseId), [expensesCtx.expenses, editedExpenseId]);

    const deleteExpenseHandler = async () => {
        try {
            setIsSubmitting(true);
            await deleteExpense(editedExpenseId);
            expensesCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        } catch (err) {
            setError('Could not delete expense - please try again later!');
            setIsSubmitting(false);
        }

    };

    const cancelHandler = () => {
        navigation.goBack();
    };

    const confirmHandler = async (expenseData) => {
        try {
            setIsSubmitting(true);
            if (isEditing) {
                expensesCtx.updateExpense(editedExpenseId, expenseData);
                await updateExpense(editedExpenseId, expenseData);
            } else {
                const id = await storeExpense(expenseData);
                expensesCtx.addExpense({id, ...expenseData});
            }
            navigation.goBack();
        } catch (err) {
            setError('Could not save data - please try again later!');
            setIsSubmitting(false);
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    const errorHandler = () => {
        setError(null);
    };

    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />;
    }

    if (isSubmitting) {
        return <LoadingOverlay />;
    }
    return (
        <View style={styles.container}>
            <ExpenseForm
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                defaultValues={selectedExpense}
            />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton icon={"trash"} color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler}/>
                </View>
            )}
        </View>
    );
};

export default ManageExpenses;
