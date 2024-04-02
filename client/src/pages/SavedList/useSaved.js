import { deletePattern, getPatterns } from "../../apis/pattern-apis.js";
import { AppContext, AppDispatchContext } from "../../contexts/appContext.js";
import { useContext, useEffect } from 'react'

export const useSaved = (setCanEditGrid, setCanEditForm) => {
    const context = useContext(AppContext)
    const dispatch = useContext(AppDispatchContext)
    const { patterns, editMode, saveClicked } = context; 

    useEffect(() => {
        getPatterns().then(patterns => {
            dispatch({ type: 'SET_INITIAL_PATTERNS', payload: patterns });
        });
    }, [saveClicked])
    
    const savedItemClick = (id) => {
        const pattern = patterns.filter(item => item._id == id)

        setCanEditForm(false);
        setCanEditGrid(false);

        dispatch({ type: 'RESET_PATTERN' })
        dispatch({ type: 'HIDE_GRID', payload: true });
        dispatch({ type: 'SAVE_CLICKED', payload: true })

        setTimeout(() => {
            dispatch({ type: 'ADD_MODE', payload: false })
            dispatch({ type: 'EDIT_MODE', payload: false })
            dispatch({ type: 'SET_PATTERN', payload: pattern[0] })
            dispatch({ type: 'SET_CLICKED_PATTERN', payload: pattern[0] })
            dispatch({ type: 'HIDE_GRID', payload: false })
            // dispatch({ type: 'SAVE_CLICKED', payload: false })
        }, 250)
    }

    // const deleteItemClick = (id) => {

    //     deletePattern(id).then(() => {
    //         getPatterns()
    //             .then(patterns => {
    //                 dispatch({ type: 'SET_INITIAL_PATTERNS', payload: patterns });
    //             })
    //             .catch(error => console.log(error));

    //         setTimeout(() => {
    //             dispatch({ type: 'RESET_PATTERN' })
    //             setHideGrid(true)
    //         }, 50)
    //     })
    // }

    // const editItemClick = (e) => {
    //     // const pattern = patterns.filter(item => item.id == e.target.id)

    //     // dispatch({ type: 'SET_EDIT', payload: pattern });

    //     // setCanEditForm(true);
    //     // setCanEditGrid(true);

    //     // setHideGrid(true);
    //     // dispatch({ type: 'RESET_PATTERN' })

    //     // setTimeout(() => {
    //     //     dispatch({ type: 'SET_PATTERN', payload: pattern[0] })
    //     //     setHideGrid(false)
    //     // }, 50)
    // }

    return {
        patterns,
        editMode,
        savedItemClick,
        // deleteItemClick,
        // editItemClick,
    }
}