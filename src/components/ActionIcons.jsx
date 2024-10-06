import style from "../styles/ActionIcons.module.scss";
import Icon from "./Icon";

import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import addNote from "../hooks/usePostNoteData";
import removeNote from "../hooks/useRemoveNote";
import MoreIconMenu from "./MoreIconMenu";

export default function ActionIcons({note=[] , className ,isTrash=false , readonly = false , setShowBgStyle}) {
    let { setTriggerReload } = useData();
    
    let {pathname} = useLocation();
    let restorePath = pathname.split("/")[1];
    // local states 
    const [showMenu , setShowMenu] = useState(false);
  

    
    async function handleRemove() {
        try {
            await removeNote(note.location,note.id);
            
            setTriggerReload(prev => !prev );
        }catch(err) {
            console.log(err);
        }

    }

    async function handleRestore() {
        note = {
            ...note,
            isPinned: false,
            location: "notes",
        };
        try {
            await addNote(note,"notes");
            await removeNote(restorePath,note.id);
            setTriggerReload(prev => !prev );
        }catch(err) {
            console.log(err);
        }

    }
    async function handleArchive() {
        note = {
            ...note,
            isPinned: false,
            location: "archive",
        };
        try {
            await addNote(note,note.location);
            await removeNote("notes",note.id);
            setTriggerReload(prev => !prev );
        }catch(err) {
            console.log(err);
        }

    }

    function handleClick(action) {
        if(!readonly)
        {
            setShowMenu(false);
            setShowBgStyle(false);
            if(action == "archive") {
                handleArchive();
            } else if (action == "delete") {
                handleRemove();
            } else if (action == "restore") {
                handleRestore();
            }
       
        }
    }

    function handleToggle() {
        if(!readonly) {
            setShowBgStyle(false);
            setShowMenu(prev => !prev);
        }
        
    }
    function handlePallette() {
        if(!readonly) {
            setShowMenu(false);
            setShowBgStyle(prev => !prev);
        }
    }
    
    


    return (
        <div className={`${style.actionIcons} ${className}`}>
            { !isTrash &&
            <>
                <Icon name="notification_add" className={style.icon} onClick={()=> handleClick()}  />
                <Icon name="person_add" className={style.icon} onClick={()=> handleClick()}  />
                <Icon name="palette" className={style.icon} onClick={handlePallette} />
                <Icon name="image" className={style.icon} onClick={()=> handleClick()}  />
                {restorePath != "archive" &&  <Icon name="archive" className={style.icon} onClick={() => handleClick("archive")} />}
                {restorePath == "archive" && <Icon name="unarchive" className={style.icon} onClick={() => handleClick("restore")}/>}
                <Icon name="more_vert" className={style.icon} onClick={handleToggle}/>

                {showMenu &&   <MoreIconMenu note={note} showMenu={setShowMenu} />}
             
            </>
            }
            { isTrash &&
            <div className={style.trash}>
                <Icon name="delete_forever" className={style.icon} onClick={handleRemove} />
                <Icon name="restore_from_trash" className={style.icon} onClick={handleRestore} />
            </div>
            }
 
        </div>
    );

}