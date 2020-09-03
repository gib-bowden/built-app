import React, { FunctionComponent} from 'react'
import { LoanInfo, LoanInfoTypes } from '../common/types'
import { connect } from 'react-redux';
import { Budget, BudgetActionTypes } from '../store/types/budgetTypes';
import { updateBudget } from '../store/actions/budgetActions';
import { Dispatch } from 'redux';

interface InitProps {
    loanInfo: LoanInfo,
    type: LoanInfoTypes
}

interface DispatchToProps {
  updateBudget: (budget: Budget) => BudgetActionTypes 
}

interface Props extends InitProps, DispatchToProps {

}

const LoanDetail: FunctionComponent<Props> = ({loanInfo, type}) => {
  //could add more types here, so one function could handle details for loans, budgets or collateral 
  if (type === LoanInfoTypes.budget) {
      //probably not the best way to handle this
        let remainingAmount = -1;
        if (loanInfo?.loanBudget?.budgetAmount && loanInfo?.loanBudget?.spendAmount) {
           remainingAmount = loanInfo?.loanBudget?.budgetAmount - loanInfo?.loanBudget?.spendAmount
        }
        let remainingAmountElement = (remainingAmount !== -1) ? <span className="card-title">{remainingAmount}</span> : <span className="card-title">budget not complete</span>

        return (
            <div className="row">
            <div className="col s12 m6">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <h5>Loan Number: {loanInfo.loanId}</h5>
                  <p>Budget Amount</p> 
                  <span className="card-title">{loanInfo.loanBudget?.budgetAmount}</span>
                  <p>Spend</p>
                  <span className="card-title">{loanInfo.loanBudget?.spendAmount}</span>
                  <p>Remaining</p>
                  {remainingAmountElement}
                </div>
              </div>
            </div>
          </div>
        )
    } return (null)

}

const mapDispatchToProps = (dispatch: Dispatch): DispatchToProps => {
    //when to use this vs bindActionCreators? 
  return {
      updateBudget: (budget: Budget) => dispatch(updateBudget(budget))
  }
}

export default connect<null, DispatchToProps>(null, mapDispatchToProps)(LoanDetail)