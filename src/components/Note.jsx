import { useState } from "react";
import { useData } from "../contexts/DataContext";
import { useView } from "../contexts/ViewContext";
import update from "../hooks/useUpdateNote";
import style from "../styles/Note.module.scss";
import ActionIcons from "./ActionIcons";
import BgStyle from "./BgStyle";
import Icon from "./Icon";
import ListData from "./ListData";
import TextData from "./TextData";

export default function Note({note, setBg , bgColor}) {
    
    
    const [showBgStyle , setShowBgStyle] = useState(false);

    let {setTriggerReload} = useData();
    let {isGridView} = useView();
    let viewStyle = isGridView ? style.grid_view :"";
    const {type , isPinned , location } = note;
    const isTrash = location === "trash";
    
    let pinStyle = isPinned ? style.pinned : "";

    const handleClick = async () => {
        note = {
            ...note,
            bg:bgColor,
            isPinned: !isPinned,
        };
        setShowBgStyle(false);
        await update(note, location);
        setTriggerReload(prev => !prev);
    };
    

    return (
        note && 
        <div className={`${style.note} ${viewStyle}`} style={{backgroundColor:bgColor}} >
            <div className={style.content}>
       
                { type === "text" && <TextData note={note} /> }
                { type === "list" && <ListData note={note} /> }
            </div>

            <Icon name="check" className={style.select} />
            <Icon name="keep" className={`${style.pinBtn} ${pinStyle}`} onClick={handleClick}/>
     
            <div className={style.actionGroup}>
                <ActionIcons className={style.actionIcons} isTrash={isTrash} note={note} setBg={setBg} setShowBgStyle={setShowBgStyle}  />
                
            </div>
            {showBgStyle && <BgStyle setBg={setBg }  note={note} setShowBgStyle={setShowBgStyle} /> }

        </div>
        
    );

}