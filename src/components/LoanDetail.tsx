import React, { FunctionComponent } from 'react'
import { LoanInfo } from '../common/types'

interface Props {
    loanInfo: LoanInfo,
    handleClick: () => void 
}


const LoanDetail: FunctionComponent<Props> = ({loanInfo, handleClick}) => {
    return (
        <div>
            <h1>{loanInfo.loanId}</h1>
            <div>
                <ul>
                    {(loanInfo.loanCollateral && loanInfo.loanCollateral.map((c) => {
                        return (
                            <li key={c.collateralId}>`Type: ${c.type.toString()}; Value: ${c.value}`</li>
                        )
                    }))}
                </ul>
            </div>
            <button onClick={handleClick} id="delete">Delete</button>
        </div>
    )
}

export default LoanDetail