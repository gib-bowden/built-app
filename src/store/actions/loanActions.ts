import { LoanActions, Loan, LoanActionType } from "../types/loanTypes"

// export const createLoan = (loan: Loan): LoanActions => {
//     return {
//         type: LoanActionType.ADD_LOAN,
//         loan
//     }
// }

// export const deleteLoan = (loanId: number): LoanActions => {
//     return {
//         type: LoanActionType.DELETE_LOAN,
//         id: loanId
//     }
// }

// export const updateLoan = (loan: Loan): LoanActions => {
//     return {
//         type: LoanActionType.UPDATE_LOAN,
//         loan
//     }
// }

export const loanActions = {
    createLoan(loan: Loan): LoanActions {
        return {
            type: LoanActionType.ADD_LOAN,
            loan
        }
    },
    deleteLoan(loanId: number): LoanActions{
        return {
            type: LoanActionType.DELETE_LOAN,
            id: loanId
        }
    },
    updateLoan (loan: Loan): LoanActions {
        return {
            type: LoanActionType.UPDATE_LOAN,
            loan
        }
    }
}
