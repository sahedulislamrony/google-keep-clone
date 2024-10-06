import { useState } from "react";
import { useData } from "../../contexts/DataContext";
import addNote from "../../hooks/usePostNoteData";
import style from "../../styles/ActionGroup.module.scss";
import ActionIcons from "../ActionIcons";
import InputActions from "../InputActions";
import InputItem from "./InputItem";
import NextItem from "./NextItem";
import TitleBox from "./TitleBox";

export default function ListNote({ closeInput }) {
    let { setTriggerReload } = useData();
    let [loading, setLoading] = useState(false);
    let [count, setCount] = useState(0);
    let [inputItems, setInputItems] = useState([]);
    let [title, setTitle] = useState("");
    let [isPinned, setIsPinned] = useState(false);


    let setNext = () => {
        setCount(prev => prev + 1);
        setInputItems([...inputItems, { isChecked: false, text: "" }]);
    };

    let handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setNext();
        }
    };

    const handleInputChange = (index, updatedItem) => {
        const updatedItems = inputItems.map((item, i) =>
            i === index ? updatedItem : item,
        );
        setInputItems(updatedItems);
    };
    let handlePin = () => {
        setIsPinned(prev => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let items = inputItems.filter(item => item.text.trim() !== "");
        title = title.trim();

        let data = {
            title,
            items,
            type: "list",
            location: "notes",
            isPinned,

        };

        if(title || items.length > 0) {
            setLoading(true);
            // pass the data and path to the custom hook
            await  addNote(data,"notes");
            setLoading(false);
            
            setTriggerReload(prev => !prev );
        }
        
        closeInput();
    };
   
    
    const preventEnterSubmit = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); 
        }
    };

    return (
        <form onSubmit={handleSubmit} onKeyDown={preventEnterSubmit} >
            <TitleBox  value={title} onChange={(e) => setTitle(e.target.value) } handlePin={handlePin}  isPinned={isPinned}/>
            {Array.from({ length: count }).map((_, index) => (
                <InputItem
                    key={index}
                    onKeyDown={handleKeyDown}
                    onChange={(updatedItem) => handleInputChange(index, updatedItem)}
                />
            ))}
            <NextItem showInput={setNext} />
            <div className={style.actionGroup}>
                <ActionIcons readonly={true}   />
                <InputActions close={closeInput} text="done" loading={loading}/>
            </div>
               
        </form>
       
    );
}
