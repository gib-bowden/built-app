import { BudgetActionTypes, Budget, ADD_BUDGET, DELETE_BUDGET, UPDATE_BUDGET } from "../types/budgetTypes"

export const createBudget = (budget: Budget): BudgetActionTypes => {
    return {
        type: ADD_BUDGET,
        budget
    }
}

export const deleteBudget = (budgetId: number): BudgetActionTypes => {
    return {
        type: DELETE_BUDGET,
        id: budgetId
    }
}

export const updateBudget = (budget: Budget): BudgetActionTypes => {
    return {
        type: UPDATE_BUDGET,
        budget
    }
}

