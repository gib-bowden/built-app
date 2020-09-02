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

export enum LoanActionType {
    ADD_LOAN = 'ADD_LOAN',
    DELETE_LOAN = 'DELETE_LOAN',
    UPDATE_LOAN = 'UPDATE_LOAN',
    GET_LOANS = 'GET_LOANS'   
}



interface AddLoanAction {
  type: LoanActionType.ADD_LOAN
  loan: Loan
}

interface DeleteLoanAction {
    type: LoanActionType.DELETE_LOAN
    id: number
}

interface UpdateLoanAction {
    type: LoanActionType.UPDATE_LOAN
    loan: Loan
}

interface GetLoansAction {
    type: LoanActionType.GET_LOANS
}

export type LoanActions = AddLoanAction | DeleteLoanAction | UpdateLoanAction | GetLoansAction
