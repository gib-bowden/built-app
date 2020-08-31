import { LoanActionTypes, Loan, ADD_LOAN, DELETE_LOAN, UPDATE_LOAN } from "../types/loanTypes"

export const createLoan = (loan: Loan): LoanActionTypes => {
    return {
        type: ADD_LOAN,
        loan
    }
}

export const deleteLoan = (loanId: number): LoanActionTypes => {
    return {
        type: DELETE_LOAN,
        id: loanId
    }
}

export const updateLoan = (loan: Loan): LoanActionTypes => {
    return {
        type: UPDATE_LOAN,
        loan
    }
}

