import { useState } from 'react'
import '../../App.css'
import './Cell.css'
import { useCell } from './useCell.js'

function Cell({id, canEditGrid, className}) {
    
    const {handleCellClick, cellClick} = useCell(id, canEditGrid)

    return (
        <>
            <div id={id} onClick={handleCellClick} className={cellClick ? `gridSquare ${canEditGrid ? className : `${className} disabled`}` : `gridSquare ${canEditGrid ? '' : 'disabled'}`}>
            </div>
        </>
    )
}

export default Cell