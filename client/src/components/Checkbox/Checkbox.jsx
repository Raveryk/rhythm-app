

import { useState } from 'react'
import '../../App.css'
import './Checkbox.css'

function Checkbox({canEditForm, label, onChange, checked}) {
    
    return (
        <>
            <div className="inputContainer">
            <label className="">{label}</label>
            <input disabled={!canEditForm} className="formCheckbox" onChange={onChange} checked={checked} type="checkbox"/>
            </div>
        </>
    )
}

export default Checkbox