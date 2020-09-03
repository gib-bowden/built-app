export interface Collateral {
    id?: number,
    loanId: number,
    type: string,
    value: number
}

export interface CollateralState {
    collateral: Array<Collateral>
}

export enum CollateralActionType {
    ADD_COLLATERAL = 'ADD_COLLATERAL',
    DELETE_COLLATERAL = 'DELETE_COLLATERAL',
    UPDATE_COLLATERAL = 'UPDATE_COLLATERAL'  
}


interface AddCollateralAction {
  type: CollateralActionType.ADD_COLLATERAL
  collateral: Collateral
}

interface DeleteCollateralAction {
    type: typeof CollateralActionType.DELETE_COLLATERAL
    ids: Array<number>
}

interface UpdateCollateralAction {
    type: typeof CollateralActionType.UPDATE_COLLATERAL
    collateral: Collateral
}

export type CollateralActions = AddCollateralAction | DeleteCollateralAction | UpdateCollateralAction