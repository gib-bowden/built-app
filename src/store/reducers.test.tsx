import collateralReducer, {initState as initColState} from './reducers/collateralReducer'
import {collateralActions} from './actions/collateralActions'
import { Collateral } from './types/collateralTypes'


  it('should handle ADD_COLLATERAL', () => {
    let nextId = Math.max(...initColState.collateral.map(c => c.id as number)) + 1
    let newCollateral: Collateral = {
      loanId: 1,
      type: "Building",
      value: 20000
    }
    let expectedCollateral: Collateral = {
      ...newCollateral,
      id: nextId
    }
    expect(
      collateralReducer(initColState, collateralActions.createCollateral(newCollateral)).collateral.filter(c => c.id === nextId)
    ).toEqual([
      {...expectedCollateral}
    ])
  })

  it('should handle DELETE_COLLATERAL', () => {
    let ids = initColState.collateral.map(c => c.id as number)
    let firstId = Math.min(...ids)
    let lastId = Math.max(...ids)
    let expectedIds = ids.filter(id => ![firstId, lastId].includes(id))
    let reducerResult = collateralReducer(initColState, collateralActions.deleteCollateral([firstId, lastId]))
    
    expect(reducerResult.collateral.map(c => c.id)
    ).toEqual(expectedIds)
  })