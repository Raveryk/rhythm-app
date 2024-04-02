

import '../../App.css'
import './Radio.css'

function Radio({canEditForm, label, onChange, value, name, checkedVal}) {
    
    return (
        <>
            <div className="inputContainer">
            <label>{label}</label>
            <input disabled={!canEditForm} className="formInput" type="radio" onChange={onChange} value={value} checked={value === checkedVal} name={name}/>
            </div>
        </>
    )
}

export default Radio