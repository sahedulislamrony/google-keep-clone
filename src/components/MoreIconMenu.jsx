import { useState } from "react";
import addNote from "../hooks/usePostNoteData";
import removeNote from "../hooks/useRemoveNote";
import style from "../styles/MoreIconMenu.module.scss";
import { useData } from "./../contexts/DataContext";
import History from "./History";
import Popup from "./Popup";

export default function MoreIconMenu({note , showMenu}) {
    let { setTriggerReload } = useData();
    const {id , location} = note;
    const [showHistory, setShowHistory] = useState(false);

    async function handleRemove() {
        try {
            await removeNote(location,id);

            // add to trash
            if (location != "trash") {
                note = {
                    ...note,
                    isPinned: false,
                    location: "trash",
                };
                await addNote(note,"trash");
            }  
            showMenu(prev => !prev);     
            setTriggerReload(prev => !prev );
        }catch(err) {
            console.log(err);
        }

    }

    async function handleCopy() {
        note = {
            ...note,
            isPinned: false,
            id: null,
            location: "notes",
        };
        try {
            await addNote(note,"notes");
            showMenu(prev => !prev);
            if(location == "notes") {
                setTriggerReload(prev => !prev );
            }
           
        }catch(err) {
            console.log(err);
        }
    }

    function handleHistory() {
        setShowHistory(true);
        // showMenu(false);
    }

    return (
        <>
            <div className={style.moreMenu}>
                <ul>
                    <li onClick={handleRemove}>Delete note</li>
                    <li onClick={() => showMenu(false) }>Add label</li>
                    <li onClick={handleCopy}>Make a copy</li>
                    <li onClick={handleHistory}>Version history</li>
                </ul>
            </div>


            {showHistory &&
                 <Popup > 
                     <History note={note} setShowHistory={setShowHistory} showMenu={showMenu} />
                 </Popup>
            }
        </>
        
    );
}

// last data is not delaying