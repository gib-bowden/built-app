import { Collateral, CollateralActionTypes, ADD_COLLATERAL, DELETE_COLLATERAL, UPDATE_COLLATERAL } from "../types/collateralTypes"

export const createCollateral = (collateral: Collateral): CollateralActionTypes => {
    return {
        type: ADD_COLLATERAL,
        collateral
    }
}

export const deleteCollateral = (collateralId: number): CollateralActionTypes => {
    return {
        type: DELETE_COLLATERAL,
        id: collateralId
    }
}

export const updateCollateral = (collateral: Collateral): CollateralActionTypes => {
    return {
        type: UPDATE_COLLATERAL,
        collateral
    }
}

