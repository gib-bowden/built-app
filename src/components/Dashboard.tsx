import React, { Component, ChangeEvent, FormEvent } from "react";
import { connect } from "react-redux";
import { RootState } from "../store/reducers/rootReducer";
import { LoanInfo } from "../common/types";
import LoanDetail from "./LoanDetail";
import { loanActions } from '../store/actions/loanActions'
import {Dispatch, bindActionCreators} from 'redux'
import { Loan, LoanActions } from "../store/types/loanTypes";

import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Collateral, CollateralActions } from "../store/types/collateralTypes";
import { collateralActions } from "../store/actions/collateralActions";
import { FirstDataRenderedEvent, GridApi, ColumnApi } from "ag-grid-community";

interface StoreToProps {
    loans: Array<LoanInfo>
    collateral: Array<Collateral>
 }

interface DispatchToProps {
    // deleteLoan: (loanId: number) => void,
    // createLoan: (loan: Loan) => void
    loanActions: {
        createLoan: (loan:Loan) => LoanActions,
        deleteLoan: (loanId:number) => LoanActions,
        updateLoan: (loan:Loan) => LoanActions
    }

    collateralActions: {
        createCollateral: (collateral: Collateral) => CollateralActions,
        deleteCollateral: (ids: Array<number>) => CollateralActions,
        updateCollateral: (collateral: Collateral) => CollateralActions
    }
}

interface Props extends StoreToProps, DispatchToProps {

}

interface State {
    newCollateral: Collateral
}

class Dashboard extends Component<Props> {
    
    emptyCollateral: Collateral = {
        type: '',
        loanId: -1,
        value: -1
    }

    readonly state: State = {
        newCollateral: {...this.emptyCollateral}
    }  

    gridApi: GridApi | undefined
    gridColumnApi: ColumnApi | undefined;
    
    colDefs = [
        { field: "id", checkboxSelection: true },
        { field: "type" },
        { field: "value"},
        { field: "loanId"}
      ];
      
    defaultColDef = { 
        flex: 1,
        minWidth: 100,
        sortable: true,
        resizable: true,
    };

    resetState = () => {
        this.setState({ newCollateral: {...this.emptyCollateral} }) 
    }

    onGridReady = (params:FirstDataRenderedEvent) => {
        this.gridApi = params.api as GridApi;
        this.gridColumnApi = params.columnApi as ColumnApi;
    };

    
    deleteCollateral = (): void => {
       let ids = [] as number[];

       this.gridApi?.forEachNode(node => {
           if (node.isSelected()) {
               ids.push(node.data.id)
           }
       }) 
       this.props.collateralActions.deleteCollateral(ids)
    }

    addCollateral = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.props.collateralActions.createCollateral(this.state.newCollateral)
        this.resetState()
    }

    handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void => {
        let newState = {...this.state, newCollateral: {...this.state.newCollateral}}
        let id: string = e.target.id;
        if (id === 'value') newState.newCollateral.value = parseInt(e.target.value, 10)
        if (id === 'type') newState.newCollateral.type = e.target.value
        if (id === 'loanId') newState.newCollateral.loanId = parseInt(e.target.value, 10)

        this.setState(newState);

    }

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
            <div>
                <div className="project-list">
                    <h1>Project List</h1>
                    <ul>{loanDetailList}</ul>
                </div>
                <div id="myGrid" style={{ height: 300 }} className="ag-theme-alpine">
                    <form onSubmit={this.addCollateral} className="addCollateral">
                        <input onChange={this.handleChange} id="loanId" placeholder="Loan ID"></input>  
                        <input onChange={this.handleChange} id="type" placeholder="Collateral Type"></input>  
                        <input onChange={this.handleChange} id="value" placeholder="Collateral Value"></input>  
                        <button className="btn pink lighten-1 z-depth-0">Create</button>
                    </form>
                    <button onClick={() => this.deleteCollateral()}>Delete Collateral</button>
                    <AgGridReact
                        rowData={this.props.collateral}
                        columnDefs={this.colDefs}
                        immutableData={true}
                        getRowNodeId={data => data.id}
                        onGridReady={this.onGridReady}
                        defaultColDef={this.defaultColDef}
                        rowSelection={"multiple"}
                        onFirstDataRendered={params => params.api.sizeColumnsToFit()}
                    ></AgGridReact>
                </div>
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
        loans,
        ...state.collateral
    }
}

const mapDispatchToProps = (dispatch: Dispatch) : DispatchToProps => {
    return {
        // deleteLoan: (loanId: number) => dispatch(deleteLoan(loanId)),
        // createLoan: (loan: Loan) => dispatch(createLoan(loan)) 
        loanActions: bindActionCreators(loanActions, dispatch),
        collateralActions: bindActionCreators(collateralActions, dispatch)
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps,
    null,
    { forwardRef: true })(Dashboard);