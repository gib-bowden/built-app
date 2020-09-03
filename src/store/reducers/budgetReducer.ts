import { BudgetState, BudgetActionTypes, ADD_BUDGET, DELETE_BUDGET, UPDATE_BUDGET } from "../types/budgetTypes";

const initState: BudgetState = {
    budget: [
        {budgetId: 1, loanId: 1, budgetAmount: 990000, spendAmount: 147000, budgetDate: new Date('2-2-2020') },
        {budgetId: 2, loanId: 2, budgetAmount: 900000, spendAmount: 200, budgetDate: new Date('2-2-2020') },
        {budgetId: 3, loanId: 3, budgetAmount: 1000000, spendAmount: 1000000, budgetDate: new Date('2-2-2020') },
    ]
}

const budgetReducer = (state: BudgetState = initState, action: BudgetActionTypes): BudgetState => {
    switch (action.type) {
        case ADD_BUDGET:
            return {
                budget: [...state.budget, action.budget]
            }
        case DELETE_BUDGET: 
            return {
                budget: state.budget.filter(item => item.budgetId !== action.id)
            }
        case UPDATE_BUDGET:
            return {
                budget: state.budget.map(item => (item.budgetId !== action.budget.budgetId) ? item : {...item, ...action.budget})
            }
        default:
            return state;
    }
    
}

export default budgetReducer