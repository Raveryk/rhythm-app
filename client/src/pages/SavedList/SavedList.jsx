import { useEffect, useState } from 'react';
import '../../App.css'
import { getPatterns } from '../../apis/pattern-apis';
import SavedItem from './SavedItem';
import {useSaved} from './useSaved'
import FormButton from '../../components/FormButton/FormButton';
import { MoreVertical } from 'react-feather';

function SavedList({ setCanEditGrid, setCanEditForm }) {
    const {patterns} = useSaved();

    return (
        <>
        { patterns && patterns.length > 0 && 
            <ul>
            {
                patterns.map(item => <SavedItem 
                    savedItem={item.patternTitle}
                    setCanEditGrid={setCanEditGrid}
                    setCanEditForm={setCanEditForm}
                    id={item._id}
                    key={item._id} 
                    />
                )
            }
        </ul>}
        </>
    )
}

export default SavedList