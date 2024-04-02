import { AppContext, AppDispatchContext } from "../../contexts/appContext.js";
import { useContext, useState } from 'react'
import toast from "react-hot-toast";
import { getPatterns, saveNewPatternPOST, updatePattern } from "../../apis/pattern-apis.js";

export const useForm = (setCanEditForm, setCanEditGrid) => {

    const context = useContext(AppContext);
    const dispatch = useContext(AppDispatchContext);

    const [showSavedList, setShowSavedList] = useState(false);

    const { beats, subs, rows, clickedIds, patternTitle, addMode, editMode, _id } = context

    const handleBeatChange = (event) => {
        const val = event.target.value;
        dispatch({ type: 'SET_NUM_OF_CELLS', payload: val * subs })
        dispatch({ type: 'SET_BEATS', payload: val })
    }

    const handleSubChange = (event) => {
        const val = event.target.value;
        dispatch({ type: 'SET_NUM_OF_CELLS', payload: val * beats })
        dispatch({ type: 'SET_SUBS', payload: val })
    }

    const handleHHCheckBox = (event) => {
        const val = event.target.checked;
        dispatch({ type: 'SET_HH', payload: val })
    }

    const handleBassDrumCheckBox = (event) => {
        const val = event.target.checked;
        dispatch({ type: 'SET_BD', payload: val })
    }

    const handleSnareDrumCheckBox = (event) => {
        const val = event.target.checked;
        dispatch({ type: 'SET_SD', payload: val })
    }

    const createPattern = () => {
        setCanEditGrid(true);
        setCanEditForm(false);

        dispatch({ type: 'ADD_MODE', payload: true });
    }

    const resetPattern = () => {
        setCanEditGrid(false);
        setCanEditForm(true);

        dispatch({ type: 'ADD_MODE', payload: false });
        dispatch({ type: 'EDIT_MODE', payload: false});
        dispatch({ type: 'RESET_PATTERN' });
    }

    const handleSavedButtonClick = () => {
        setShowSavedList(!showSavedList)
    }

    const generateRandomPattern = () => {
        const numArr = [1, 2, 3, 4]
        const min = 1;
        const max = 4;
        const beatsNum = numArr[Math.floor(Math.random() * (max - min) + min)];
        const subsNum = numArr[Math.floor(Math.random() * (max - min) + min)];
        const numOfCellsNum = beatsNum * subsNum;
        const rowsNum = numArr[Math.floor(Math.random() * (max - min) + min)];

        const clicksNum = Math.floor(Math.random() * (numOfCellsNum * rowsNum));

        let randomClickedIds = []
        for (let i = 0; i < clicksNum; i++) {
            randomClickedIds.push(`row-${Math.floor(Math.random() * rowsNum+1)}-cell-${Math.floor(Math.random() * numOfCellsNum+1) }`)
        }

        dispatch({ type: 'RESET_PATTERN' })

        setTimeout(() => {
            dispatch({
                type: 'GENERATE_RANDOM',
                payload: {
                    numOfCells: numOfCellsNum,
                    beats: beatsNum,
                    subs: subsNum,
                    rows: rowsNum,
                    clickedIds: randomClickedIds,
                }
            });
        }, 50)
        
        setCanEditGrid(true);
        setCanEditForm(false);

        dispatch({ type: 'ADD_MODE', payload: true });
    }


    const savePattern = (e) => {
        e.preventDefault();

        if (addMode) {
            let newPattern = {
                rows,
                beats,
                subs,
                numOfCells: beats * subs,
                clickedIds,
                patternTitle,
            };

            if (patternTitle.length > 0) {
                saveNewPatternPOST(newPattern);

                getPatterns()
                    .then(patterns => {
                        dispatch({ type: 'SET_INITIAL_PATTERNS', payload: patterns });
                        dispatch({ type: 'SET_CLICKED_PATTERN', payload: patterns[patterns.length - 1] })
                        dispatch({ type: 'EDIT_MODE', payload: false });
                        dispatch({ type: 'ADD_MODE', payload: false});
                        dispatch({ type: 'SAVE_CLICKED', payload: true});
                        setCanEditForm(false);
                        setCanEditGrid(false);
                    })
                    .catch(error => console.log(error));

            } else {
                toast.error('Pattern Title is Required!');
            }
        } else if (editMode) {
            let editedPattern = {
                rows,
                beats,
                subs,
                numOfCells: beats * subs,
                clickedIds,
                patternTitle,
                _id
            }

            if (patternTitle.length > 0) {
                updatePattern(_id, editedPattern);

                getPatterns()
                    .then(patterns => {
                        dispatch({ type: 'SET_INITIAL_PATTERNS', payload: patterns });
                        dispatch({ type: 'SET_CLICKED_PATTERN', payload: patterns[patterns.findIndex(item => item._id === _id)] });
                        dispatch({ type: 'EDIT_MODE', payload: false });
                        setCanEditForm(false);
                        setCanEditGrid(false);
                    })
                    .catch(error => console.log(error));

            } else {
                toast.error('Pattern Title is Required!');
            }
        }
        
    }

    return {
        context,
        dispatch,
        handleHHCheckBox,
        handleBassDrumCheckBox,
        handleSnareDrumCheckBox,
        handleBeatChange,
        handleSubChange,
        generateRandomPattern,
        savePattern,
        createPattern,
        resetPattern,
        handleSavedButtonClick,
        showSavedList,
    }
}
