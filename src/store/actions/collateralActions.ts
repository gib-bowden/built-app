import { Collateral, CollateralActions, CollateralActionType } from "../types/collateralTypes"

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

