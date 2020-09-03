import React, { Component} from "react";
import { connect } from "react-redux";
import { RootState } from "../store/reducers/rootReducer";
import { LoanInfo, LoanInfoTypes } from "../common/types";
import LoanDetail from "./LoanDetail";
import { loanActions } from '../store/actions/loanActions'
import {Dispatch, bindActionCreators} from 'redux'
import { Loan, LoanActions } from "../store/types/loanTypes";

import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Collateral, CollateralActions } from "../store/types/collateralTypes";
import { collateralActions } from "../store/actions/collateralActions";
import { FirstDataRenderedEvent, GridApi, ColumnApi, RowClickedEvent } from "ag-grid-community";
import AddCollateral from "./AddCollateral";

interface StoreToProps {
    loans: Array<LoanInfo>
    collateral: Array<Collateral>
 }

interface DispatchToProps {
    //QUESTION: does this interface make sense here? Or should I define it somewhere else? 
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
    //Question: Does this make sense? 
}

interface State {
    selectedLoan: LoanInfo
}

class Dashboard extends Component<Props, State> {
    
    //Best way to define these properties? 
    gridApi: GridApi | undefined;
    gridColumnApi: ColumnApi | undefined;
    
    colDefs = [
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

    //this gives class props access to the grid api when the grid is rendered
    onGridReady = (params:FirstDataRenderedEvent) => {
        this.gridApi = params.api as GridApi;
        this.gridColumnApi = params.columnApi as ColumnApi;
    };

    handleRowSelected = ( e: RowClickedEvent ): void => {    
        //fires on selected & deselect, must check if row(node) is incoming as selected
        if (e.node.isSelected()) {
            let selection = e.data as Collateral;
            let selectedLoan = this.props.loans.find(l => l.loanId === selection.loanId);
            if (selectedLoan) this.setState({selectedLoan});
        }

    };
    
    deleteCollateral = (): void => {
        //best way to define empty array of numbers, or use construtor? 
        let ids = [] as number[];

        this.gridApi?.forEachNode(node => {
            if (node.isSelected()) {
                ids.push(node.data.id)
            }
        }) 
       this.props.collateralActions.deleteCollateral(ids)
    }

    render() {
        return (
            <div className="dashboard container">  
                <div className="row">
                    <h5>Collateral</h5>
                </div>                        
                <div className="flex-container">
                    <div className="collateral-list flex-child">
                        <h6>List</h6>
                        <div id="myGrid" style={{ height: 300 }} className="ag-theme-alpine">
                            <AgGridReact
                                rowData={this.props.collateral}
                                columnDefs={this.colDefs}
                                immutableData={true}
                                getRowNodeId={data => data.id}
                                rowSelection={'single'}
                                onRowSelected={this.handleRowSelected}
                                onGridReady={this.onGridReady}
                                defaultColDef={this.defaultColDef}
                                onFirstDataRendered={params => params.api.sizeColumnsToFit()}
                            ></AgGridReact>
                        </div>
                        <button className="btn pink lighten-1 z-depth-0" onClick={() => this.deleteCollateral()}>Delete Collateral</button> 

                    </div>
                    <div className="add-collateral flex-child">
                        <h6>Add Collateral</h6>
                        <AddCollateral />
                    </div>
                </div> 
                <div className="flex-container">
                    <div className="budget-detail flex-child">
                        {(this.state?.selectedLoan) ? (<LoanDetail loanInfo={this.state.selectedLoan} type={LoanInfoTypes.budget} /> ) : null }    
                    </div>
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
        loanActions: bindActionCreators(loanActions, dispatch),
        collateralActions: bindActionCreators(collateralActions, dispatch)
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps,
    null,
    { forwardRef: true })(Dashboard);