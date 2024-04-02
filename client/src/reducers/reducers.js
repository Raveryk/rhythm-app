
export const initialState = {
    rows: 1,
    beats: 1,
    subs: 1,
    numOfCells: 1,
    clickedIds: [],
    patternTitle: '',
    patterns: [],
    clickedPattern: {},
    hideGrid: false,
    editMode: false,
    addMode: false,
    saveClicked: false
}

export const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_ROWS' :
            return action.payload === 'increment' ? { ...state, rows: state.rows++ } : { ...state, rows: state.rows-- }
        case 'SET_BEATS' :
            return action.payload === 'increment' ? { ...state, beats: state.beats++ } : { ...state, beats: state.beats-- }
        case 'SET_SUBS' :
            return action.payload === 'increment' ? { ...state, subs: state.subs++ } : { ...state, subs: state.subs-- }
        case 'SET_NUM_OF_CELLS' :
            return { ...state, numOfCells: state.beats * state.subs }
        case 'GENERATE_RANDOM' :
            return { ...state, ...action.payload}
        case 'SET_TITLE' :
            return { ...state, patternTitle: action.payload}
        case 'ADD_ID' :
            return { ...state, clickedIds: [...state.clickedIds, action.payload]}
        case 'REMOVE_ID' :
            let clickedIds = state.clickedIds.filter(item => item !== action.payload)
            return { ...state, clickedIds: [...clickedIds] }
        case 'SET_INITIAL_PATTERNS' :
            return { ...state, patterns: action.payload }
        case 'SET_PATTERN' :
            return { ...state, ...action.payload }
        case 'RESET_PATTERN' :
            return { rows: 1,
                beats: 1,
                subs: 1,
                numOfCells: 1,
                clickedIds: [],
                patternTitle: '',
                patterns: state.patterns,
                clickedPattern: {},
                hideGrid: false,
                editMode: false,
                addMode: false,
                saveClicked: false
            }
        case 'SET_CLICKED_PATTERN':
            return { ...state, clickedPattern: action.payload }
        case 'ADD_MODE' :
            return { ...state, addMode: action.payload }
        case 'HIDE_GRID' :
            return { ...state, hideGrid: action.payload }
        case 'EDIT_MODE' :
            return { ...state, editMode: action.payload }
        case 'SAVE_CLICKED' :
            return { ...state, saveClicked: action.payload }
        default :
            throw new Error('Error Dispatching...')
    }
}

// export const initialGridState = {
//     hideGrid: true
// }

// export const gridReducer = (state, action) => {
//     switch(action.type) {
        
//     }
// }