import React, { Component, FormEvent, ChangeEvent } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { collateralActions } from '../store/actions/collateralActions'
import { Collateral, CollateralActions } from '../store/types/collateralTypes'
import { connect } from 'react-redux'

interface DispatchToProps {
    actions: {
        createCollateral: (collateral: Collateral) => CollateralActions,
    }
}

interface Props extends DispatchToProps {

}


interface State {
    newCollateral: Collateral
}

class AddCollateral extends Component<Props> {

    emptyCollateral: Collateral = {
        type: '',
        loanId: -1,
        value: -1
    }

    readonly state: State = {
        newCollateral: {...this.emptyCollateral}
    }  

    resetState = () => {
        this.setState({ newCollateral: {...this.emptyCollateral} }) 
    }

    addCollateral = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.props.actions.createCollateral(this.state.newCollateral)
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
        return (
            <div>
                <form onSubmit={this.addCollateral} className="addCollateral">
                    <input onChange={this.handleChange} id="loanId" placeholder="Loan ID"></input>  
                    <input onChange={this.handleChange} id="type" placeholder="Collateral Type"></input>  
                    <input onChange={this.handleChange} id="value" placeholder="Collateral Value"></input>  
                    <button className="btn pink lighten-1 z-depth-0">Create Collateral</button>
                </form> 
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch: Dispatch) : DispatchToProps => {
    return {
        actions: bindActionCreators(collateralActions, dispatch),
    }
}



export default connect(
    null, 
    mapDispatchToProps
    )(AddCollateral);
