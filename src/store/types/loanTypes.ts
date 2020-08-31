export interface Loan {
    loanId: number,
    broker: string,
    underwriter: string,
    period: number,
    principal: number,
    rate: number
}

export interface LoanState {
    loans: Array<Loan>
}

export const ADD_LOAN = 'ADD_LOAN'
export const DELETE_LOAN = 'DELETE_LOAN'
export const UPDATE_LOAN = 'UPDATE_LOAN'


interface AddLoanAction {
  type: typeof ADD_LOAN
  loan: Loan
}

interface DeleteLoanAction {
    type: typeof DELETE_LOAN
    id: number
}

interface UpdateLoanAction {
    type: typeof UPDATE_LOAN
    loan: Loan
}

export type LoanActionTypes = AddLoanAction | DeleteLoanAction | UpdateLoanAction