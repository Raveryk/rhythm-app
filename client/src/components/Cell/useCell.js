import { useContext, useEffect, useState} from 'react'
import { AppContext, AppDispatchContext } from '../../contexts/appContext';

export const useCell = (id, canEditGrid) => {

    const context = useContext(AppContext);
    const dispatch = useContext(AppDispatchContext);
    const [cellClick, setCellClick] = useState(false);

    const {clickedIds} = context

    useEffect(() => {
        setCellClick(context.clickedIds.includes(id))
    }, [clickedIds])

    const handleCellClick = (event) => {
        if (canEditGrid) {
            cellClick ? dispatch({ type: 'REMOVE_ID', payload: event.target.id }) : dispatch({ type: 'ADD_ID', payload: event.target.id });
            setCellClick(!cellClick);
        }
    }

    return {
        context,
        cellClick,
        handleCellClick
    }
}