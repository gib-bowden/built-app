export enum collateralType {
    Machinery = 'MACHINERY',
    Building = 'BUILDING',
    Cash = 'CASH',
    Land = 'LAND'
}

export interface Collateral {
    collateralId: number,
    loanId: number,
    type: collateralType,
    value: number
}

export interface CollateralState {
    collateral: Array<Collateral>
}

export const ADD_COLLATERAL = 'ADD_COLLATERAL'
export const DELETE_COLLATERAL = 'DELETE_COLLATERAL'
export const UPDATE_COLLATERAL = 'UPDATE_COLLATERAL'


interface AddCollateralAction {
  type: typeof ADD_COLLATERAL
  collateral: Collateral
}

interface DeleteCollateralAction {
    type: typeof DELETE_COLLATERAL
    id: number
}

interface UpdateCollateralAction {
    type: typeof UPDATE_COLLATERAL
    collateral: Collateral
}

export type CollateralActionTypes = AddCollateralAction | DeleteCollateralAction | UpdateCollateralAction