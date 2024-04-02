import '../../App.css'
import './Label.css'

function Label({label, type, canEditGrid}) {
    
    return (
        <>
            <div className={`${type === 'beat' ? `beatLabel label` : 'subLabel label'} ${canEditGrid ? '' : 'disabled'}`}>
                {label}
            </div>
        </>
    )
}

export default Label