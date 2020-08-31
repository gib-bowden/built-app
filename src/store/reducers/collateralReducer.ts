import { collateralType, CollateralState, CollateralActionTypes, ADD_COLLATERAL, DELETE_COLLATERAL, UPDATE_COLLATERAL } from "../types/collateralTypes";

const initState: CollateralState = {
    collateral: [
        {collateralId: 1, loanId: 1, type: collateralType.Building, value: 14000},
        {collateralId: 2, loanId: 3, type: collateralType.Land, value: 14000},
        {collateralId: 3, loanId: 2, type: collateralType.Cash, value: 14000},
        {collateralId: 4, loanId: 2, type: collateralType.Cash, value: 14000}
    ]
}

const collateralReducer = (state: CollateralState = initState, action: CollateralActionTypes): CollateralState => {
    switch (action.type) {
        case ADD_COLLATERAL:
            return {
                collateral: [...state.collateral, action.collateral]
            }
        case DELETE_COLLATERAL: 
            return {
                collateral: state.collateral.filter(item => item.collateralId !== action.id)
            }
        case UPDATE_COLLATERAL:
            return {
                collateral: state.collateral.map(item => (item.collateralId !== action.collateral.collateralId) ? item : {...item, ...action.collateral})
            }
        default:
            return state;
    }
    
}

export default collateralReducer