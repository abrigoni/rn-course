import ExpensesOutput from "../components/ExpensesOutput";
import {useContext, useEffect, useState} from "react";
import {ExpensesContext} from "../store/expenses-context";
import {getDateMinusDays} from "../utils/date";
import {fetchExpenses} from "../utils/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const RecentExpenses = () => {
    const [error, setError] = useState();
    const [isFetching, setIsFetching] = useState(true);
    const expensesCtx = useContext(ExpensesContext);

    const recentExpenses = expensesCtx.expenses.filter((ex) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return ex.date >= date7DaysAgo && (ex.date <= today);
    });

    useEffect(() => {
        const getExpenses = async () => {
            try {
                setIsFetching(true);
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses);
            } catch (err) {
                setError('Could not fetch expenses');
            }
            setIsFetching(false);
        };
        getExpenses();
    }, []);

    const errorHandler = () => {
        setError(null);
    };

    if (error && !isFetching) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />;
    }

    if (isFetching) {
        return <LoadingOverlay />;
    }
    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod={"Last 7 days"}
            fallbackText={"No expenses registered for the last 7 days."}
        />
    );
};

export default RecentExpenses;
