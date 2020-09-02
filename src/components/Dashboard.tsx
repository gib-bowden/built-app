import React, { Component } from "react";
import { connect } from "react-redux";
import { RootState } from "../store/reducers/rootReducer";
import { LoanInfo } from "../common/types";
import LoanDetail from "./LoanDetail";
import { loanActions } from '../store/actions/loanActions'
import {Dispatch, bindActionCreators} from 'redux'
import { Loan, LoanActions } from "../store/types/loanTypes";

interface StoreToProps {
    loans: Array<LoanInfo>
 }

interface DispatchToProps {
    // deleteLoan: (loanId: number) => void,
    // createLoan: (loan: Loan) => void
    loanActions: {
        createLoan: (loan:Loan) => LoanActions,
        deleteLoan: (loanId:number) => LoanActions,
        updateLoan: (loan:Loan) => LoanActions
    }
}

interface Props extends StoreToProps, DispatchToProps {

}

class Dashboard extends Component<Props> {
    
    render() {
        let loanDetailList = this.props.loans && this.props.loans.map(loan => {
            return (
                <LoanDetail 
                    loanInfo = {loan} key={loan.loanId}
                    // handleClick = {() => this.props.deleteLoan(loan.loanId)}
                    handleClick = {() => this.props.loanActions.deleteLoan(loan.loanId)}
                />
            )
        })

        return (
            <div className="project-list">
                <h1>Project List</h1>
                <ul>
                    {loanDetailList}
                </ul>
            </div>

        )
    }
}

const mapStateToProps = (state:RootState): StoreToProps => {
    let loanIds = state.loan.loans.map(l => l.loanId)
    let loans = new Array<LoanInfo>();
    loanIds.forEach(loanId =>{
        let loanBudget = state.budget.budget.find(b => b.loanId === loanId);
        let loanCollateral = state.collateral.collateral.filter(c => c.loanId === loanId);
        let loanDetails = state.loan.loans.find(l => l.loanId === loanId)
        loans.push({loanId, loanBudget, loanCollateral, loanDetails})
    })
    return {
        loans
    }
}

const mapDispatchToProps = (dispatch: Dispatch) : DispatchToProps => {
    return {
        // deleteLoan: (loanId: number) => dispatch(deleteLoan(loanId)),
        // createLoan: (loan: Loan) => dispatch(createLoan(loan)) 
        loanActions: bindActionCreators(loanActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);