import { LoanState, LoanActionType, LoanActions} from "../types/loanTypes";

const initState: LoanState = {
    loans: [
        {loanId: 1, broker: 'Farmington', underwriter: 'Regions', period: 60, rate: .032, principal: 240000},
        {loanId: 2, broker: 'Farmington', underwriter: 'Suntrust', period: 60, rate: .032, principal: 240000},
        {loanId: 3, broker: 'Farmington', underwriter: 'Wells Fargo', period: 60, rate: .032, principal: 240000},
        {loanId: 4, broker: 'Farmington', underwriter: 'Chase', period: 60, rate: .032, principal: 240000},
    ]
}

const loanReducer = (state: LoanState = initState, action: LoanActions): LoanState => {
    switch (action.type) {
        case LoanActionType.ADD_LOAN:
            return {
                loans: [...state.loans, action.loan]
            }
        case LoanActionType.DELETE_LOAN: 
            return {
                loans: state.loans.filter(loan => loan.loanId !== action.id)
            }
        case LoanActionType.UPDATE_LOAN:
            return {
                loans: state.loans.map(loan => (loan.loanId !== action.loan.loanId) ? loan : {...loan, ...action.loan})
            }
        default:
            return state;
    }
    
}

export default loanReducer