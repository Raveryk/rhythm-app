import { useState } from 'react'
import '../../App.css'
import './Counter.css'
import { ArrowDown, ArrowUp } from 'react-feather'
import { useCounter } from './useCounter'

function Counter({disabled, label, state, max, min}) {
    const {handleDecrementClick, handleIncrementClick} = useCounter()

    
    return (
        <>
            <div className="counterContainer">
                <label className="counterLabels">{label}</label>
                <button className="counterButton" disabled={state >= max || disabled} onClick={() => handleIncrementClick(label)}><ArrowUp /></button>
                <span className="counterVal">{state}</span>
                <button className="counterButton" disabled={state <= min || disabled} onClick={() => handleDecrementClick(label)}><ArrowDown /></button>
            </div>
        </>
    )
}

export default Counter