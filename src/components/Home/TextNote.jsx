import style from "../../styles/ActionGroup.module.scss";
import ActionIcons from "../ActionIcons";
import InputActions from "../InputActions";
import Text from "./Text";
import TitleBox from "./TitleBox";

import { useState } from "react";
import { useData } from "../../contexts/DataContext";
import addNote from "../../hooks/usePostNoteData";


export default function TextNote({closeInput}) {
    let { setTriggerReload } = useData();
    let [loading, setLoading] = useState(false);
    let [title, setTitle] = useState("");
    let [text, setText] = useState("");
    let [isPinned, setIsPinned] = useState(false);


    let handlePin = () => {
        setIsPinned(prev => !prev);
    };
  

    let handleSubmit = async (e) => {
        e.preventDefault();
        title = title.trim();
        text = text.trim();
        if(title || text) {
            const data = {
                title,
                text,
                type: "text",
                isPinned,
                location: "notes", 
            };
            setLoading(true);
            // pass the data and path to the custom hook
            await  addNote(data,"notes");
            setLoading(false);
            
            setTriggerReload(prev => !prev );
        }
        
        closeInput();
       
    };
    return (
        <form onSubmit={handleSubmit} >
            <TitleBox  value={title} onChange={(e) => setTitle(e.target.value) } handlePin={handlePin}  isPinned={isPinned}/>
            <Text value={text} onChange={(e) => setText(e.target.value) } focus={true} />
            <div className={style.actionGroup}>
                <ActionIcons  readonly={true}  />
                <InputActions  text="done" loading={loading} />
            </div>
        </form>
    );

}