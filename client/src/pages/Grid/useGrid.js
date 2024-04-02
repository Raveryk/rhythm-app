import { deletePattern, getPatterns } from "../../apis/pattern-apis.js";
import { AppContext, AppDispatchContext } from "../../contexts/appContext.js";
import { useContext } from 'react'

export const useGrid = (setCanEditGrid, setCanEditForm) => {

    const context = useContext(AppContext)
    const dispatch = useContext(AppDispatchContext)

    const {clickedPattern, patterns} = context;

    const handleTitleChange = (e) => {
        dispatch({type: 'SET_TITLE', payload: e.target.value})
    }

    const deleteItemClick = () => {
        const id = clickedPattern._id;

        deletePattern(id).then(() => {
            getPatterns()
                .then(patterns => {
                    dispatch({ type: 'SET_INITIAL_PATTERNS', payload: patterns });
                })
                .catch(error => console.log(error));

            setTimeout(() => {
                dispatch({ type: 'RESET_PATTERN' });
                setCanEditForm(true);
                // dispatch({ type: 'HIDE_GRID', payload: true })
            }, 50)
        })
    }

    const editItemClick = (e) => {
        setCanEditForm(true);
        setCanEditGrid(true);

        dispatch({type: 'EDIT_MODE', payload: true})
    }

    return {
        context,
        dispatch,
        handleTitleChange,
        deleteItemClick,
        editItemClick,
    }
}