import { Loan } from "../store/types/loanTypes";
import { Budget } from "../store/types/budgetTypes";
import { Collateral } from "../store/types/collateralTypes";

export interface LoanInfo  {
    loanId: number
    loanDetails?: Loan
    loanBudget?: Budget
    loanCollateral?: Array<Collateral>

}