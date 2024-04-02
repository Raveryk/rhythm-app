
import '../../App.css'
import './form.css'
import {useForm} from './useForm'
import FormButton from '../../components/FormButton/FormButton';
import {Gift, MoreVertical, Plus, RefreshCw, Save} from 'react-feather';
import Counter from '../../components/Counter/Counter';
import SavedList from '../SavedList/SavedList';

function Form({canEditForm, setCanEditForm, setCanEditGrid, gridTitle}) {

  const { context,
          generateRandomPattern,
          savePattern,
          createPattern,
          resetPattern,
          handleSavedButtonClick,
          showSavedList,
        } = useForm(setCanEditForm, setCanEditGrid, gridTitle);

  const {beats, subs, rows, addMode, editMode, saveClicked} = context;

  return (
    <>
      <div className="actionButtons">
          {!addMode && !editMode && !saveClicked ? <FormButton icon={<Plus size={18} />} name={'Create Pattern'} onClick={createPattern} /> : <FormButton icon={<Save size={18} />} disabled={!addMode && !editMode} name={'Save Pattern'} onClick={savePattern} /> }
          <FormButton disabled={!addMode && !editMode && !saveClicked } icon={<RefreshCw size={18} />} name={'Reset'} onClick={resetPattern} />
          <FormButton icon={<Gift size={18}/>} name={'Random'} onClick={generateRandomPattern} />
          <FormButton icon={<MoreVertical size={18}/>} name={'Saved List'} onClick={handleSavedButtonClick}/>
      </div>
      { showSavedList &&
        <div className="savedListKabobContainer">
          <SavedList setCanEditGrid={setCanEditGrid} setCanEditForm={setCanEditForm}/>
        </div>
      }
      <div className="counterGroupContainer">
        <Counter disabled={!canEditForm} label="rows" state={rows} max="4" min="1"/>
        <Counter disabled={!canEditForm} label="beats" state={beats} max="4" min="1"/>
        <Counter disabled={!canEditForm} label="subs" state={subs} max="4" min="1"/>
      </div>
    </>
  )
}

export default Form