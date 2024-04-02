import '../../App.css'
import { useSaved } from './useSaved';

function SavedItem({savedItem, id, setCanEditGrid, setCanEditForm}) {
    const {savedItemClick} = useSaved(setCanEditGrid, setCanEditForm);

    return (
        <>
            <li onClick={() => savedItemClick(id)}>
                {savedItem}
                {/* <button disabled={editMode} onClick={() => editItemClick(id)}>Edit</button>
                <button onClick={() => deleteItemClick(id)}>Delete</button> */}
            </li>
        </>
    )
}

export default SavedItem