import ExpensesOutput from "../components/ExpensesOutput";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context";
import {getDateMinusDays} from "../utils/date";

const RecentExpenses = () => {
    const expensesCtx = useContext(ExpensesContext);
    const recentExpenses = expensesCtx.expenses.filter((ex) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return ex.date >= date7DaysAgo && (ex.date <= today);
    });
    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod={"Last 7 days"}
            fallbackText={"No expenses registered for the last 7 days."}
        />
    );
};

export default RecentExpenses;
