import React, { FunctionComponent } from 'react'
import { LoanInfo, LoanInfoTypes } from '../common/types'

interface Props {
    loanInfo: LoanInfo,
    type: LoanInfoTypes
}


const LoanDetail: FunctionComponent<Props> = ({loanInfo, type}) => {
    if (type === LoanInfoTypes.budget) {
        let remainingAmount = -1;
        if (loanInfo?.loanBudget?.budgetAmount && loanInfo?.loanBudget?.spendAmount) {
           remainingAmount = loanInfo?.loanBudget?.budgetAmount - loanInfo?.loanBudget?.spendAmount
        }
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
                  <span className="card-title">{remainingAmount}</span>
                </div>
              </div>
            </div>
          </div>
        )
    } return (null)

}

export default LoanDetail