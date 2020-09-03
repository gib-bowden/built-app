import {loanActions} from './actions/loanActions'
import { LoanActions, LoanActionType, Loan } from './types/loanTypes'


describe('loan actions', () => {
  it('should create an action to add a loan', () => {
    const newLoan: Loan = {
        loanId: 6,
        broker: "Bank1",
        underwriter: "bank2",
        period: 60,
        principal: 100000,
        rate: .0045
    }
    const expectedAction: LoanActions = {
      type: LoanActionType.ADD_LOAN,
      loan: newLoan 
    }
    expect(loanActions.createLoan(newLoan)).toEqual(expectedAction)
  })
})