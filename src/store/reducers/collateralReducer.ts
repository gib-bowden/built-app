import { CollateralState, CollateralActions, CollateralActionType, Collateral } from "../types/collateralTypes";

const initState: CollateralState = {
    collateral: [
        {id: 1, loanId: 1, type: "buliding", value: 14000},
        {id: 2, loanId: 3, type: "land", value: 14000},
        {id: 3, loanId: 2, type: "cash", value: 14000},
        {id: 4, loanId: 2, type: "cash", value: 14000}
    ]
}

const collateralReducer = (state: CollateralState = initState, action: CollateralActions): CollateralState => {
    switch (action.type) {
        case CollateralActionType.ADD_COLLATERAL:
            return {
                collateral: [...state.collateral, createNewCollateral(state, action.collateral)]
            }
        case CollateralActionType.DELETE_COLLATERAL: 
            return {
                collateral: state.collateral.filter(item => !action.ids.includes(item.id as number))
            }
        case CollateralActionType.UPDATE_COLLATERAL:
            return {
                collateral: state.collateral.map(item => (item.id !== action.collateral.id) ? item : {...item, ...action.collateral})
            }
        default:
            return state;
    }
    
}

const createNewCollateral = (state: CollateralState, newCollateral: Collateral): Collateral => {
    let currentIds = state.collateral.map(c => c.id as number)
    let nextId = Math.max(...currentIds) + 1
    return {...newCollateral, id: nextId}
}

export default collateralReducer