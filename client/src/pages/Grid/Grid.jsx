import '../../App.css'
import './grid.css'
import Label from '../../components/Label/Label'
import Cell from '../../components/Cell/Cell'
import { setSubArray } from '../../utilities/util'
import { useGrid } from './useGrid'
import { Edit, Trash } from 'react-feather'
import FormButton from '../../components/FormButton/FormButton'
import { useSaved } from '../SavedList/useSaved'

function Grid({canEditGrid, setCanEditGrid, setCanEditForm}) {
    const { context, dispatch, handleTitleChange, editItemClick, deleteItemClick } = useGrid(setCanEditGrid, setCanEditForm)
    const { beats, subs, numOfCells, rows, patternTitle, addMode, clickedPattern, hideGrid, editMode} = context;

    const renderLabel = () => {
        const subDivArray = setSubArray(subs);

        let labelArr = []
        for (let i = 0; i < beats; i++) {
            // display big beats
            labelArr.push(<Label canEditGrid={canEditGrid} label={i + 1} type="beat" key={i}/>)
            for (let x = 0; x < subDivArray.length; x++) {
                // display sub divisions
                labelArr.push(<Label canEditGrid={canEditGrid} label={subDivArray[x]} type="sub" key={`${i}-${x}`}/>)
            }
        }
        return labelArr;
    }

    const renderRows = () => {
        const rowArr = [];

        for (let i = 0; i < rows; i++) {
            rowArr.push(
                <div className="gridRow" key={`${i+1}`}>
                    {renderCells(i+1)}
                </div>
            )
        }

        return rowArr;
    }

    const renderCells = (row) => {
        let cellArr = [];
        for (let i = 0; i < numOfCells; i++) {
            cellArr.push(<Cell canEditGrid={canEditGrid} dispatch={dispatch} className={`row-${row}`} id={`row-${row}-cell-${i+1}`} key={`${row}-${i+1}`}/>)
        }
        return cellArr;
    }

    return (
        <>
            <section id="rhythm-grid" className={hideGrid ? 'hide' : ''}>
                <div className="titleContainer">
                    <div className="title">
                    {rows && <input disabled={!canEditGrid} onChange={handleTitleChange} value={patternTitle} max="25" type="text" id="gridTitle" placeholder="Title" required />}
                    { clickedPattern._id && <FormButton disabled={editMode} icon={<Edit size={18}/>} name={'Edit'} onClick={editItemClick}/> }
                    { clickedPattern._id && <FormButton icon={<Trash size={18}/>} name={'Delete'} onClick={deleteItemClick}/> }
                    </div>
                </div>
                <div className="gridRow">
                    {rows && beats ? renderLabel() : <></>}
                </div>
                {renderRows()}
            </section>
        </>
    )
}

export default Grid