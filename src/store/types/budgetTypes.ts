export interface Budget {
    budgetId: number,
    loanId: number,
    budgetAmount: number,
    spendAmount: number,
    budgetDate: Date
}

export interface BudgetState {
    budget: Array<Budget>
}

export const ADD_BUDGET = 'ADD_BUDGET'
export const DELETE_BUDGET = 'DELETE_BUDGET'
export const UPDATE_BUDGET = 'UPDATE_BUDGET'


interface AddBudgetAction {
    type: typeof ADD_BUDGET
    budget: Budget
}

interface DeleteBudgetAction {
    type: typeof DELETE_BUDGET
    id: number
}

interface UpdateBudgetAction {
    type: typeof UPDATE_BUDGET
    budget: Budget
}

export type BudgetActionTypes = AddBudgetAction | DeleteBudgetAction | UpdateBudgetAction
