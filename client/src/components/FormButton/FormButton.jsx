import { useState } from 'react'
import '../../App.css'
import './FormButton.css'

function FormButton({name, onClick, icon, disabled}) {
    
    return (
        <>
            <button aria-label={name} name={name} disabled={disabled} className="formButton" onClick={onClick}>{icon ? icon : name}</button>
        </>
    )
}

export default FormButton