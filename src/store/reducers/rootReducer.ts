import {combineReducers} from 'redux'
import loanReducer from './loanReducer'
import budgetReducer from './budgetReducer';
import collateralReducer from './collateralReducer';

const rootReducer = combineReducers({
    loan: loanReducer,
    budget: budgetReducer,
    collateral: collateralReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;