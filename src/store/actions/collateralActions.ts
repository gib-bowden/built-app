import { Collateral, CollateralActions, CollateralActionType } from "../types/collateralTypes"

// export const createCollateral = (collateral: Collateral): CollateralActions => {
//     return {
//         type: ADD_COLLATERAL,
//         collateral
//     }
// }

// export const deleteCollateral = (collateralId: number): CollateralActions => {
//     return {
//         type: DELETE_COLLATERAL,
//         id: collateralId
//     }
// }

// export const updateCollateral = (collateral: Collateral): CollateralActions => {
//     return {
//         type: UPDATE_COLLATERAL,
//         collateral
//     }
// }


export const collateralActions = {
    createCollateral(collateral: Collateral): CollateralActions {
        return {
            type: CollateralActionType.ADD_COLLATERAL,
            collateral
        }
    },
    deleteCollateral(collateralIds: number[]): CollateralActions{
        return {
            type: CollateralActionType.DELETE_COLLATERAL,
            ids: collateralIds
        }
    },
    updateCollateral (collateral: Collateral): CollateralActions {
        return {
            type: CollateralActionType.UPDATE_COLLATERAL,
            collateral
        }
    }
}

