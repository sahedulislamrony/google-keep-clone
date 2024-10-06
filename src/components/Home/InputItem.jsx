import { useEffect, useRef, useState } from "react";
import style from "../../styles/ListNote.module.scss";
import Icon from "../Icon";

export default function InputItem({onChange,...rest}) {

    const inputRef = useRef(null);
    let [showInput, setShowInput] = useState(true);
    let [inputText, setInputText] = useState("");
    // let [isChecked, setIsChecked] = useState(false);
    let isChecked = false;

    let deleteItem = () => {
        setShowInput(false);
    };
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleInputChange = (e) => {
        const text = e.target.value;
        setInputText(text);
        onChange({ isChecked, text }); // Pass the updated object to the parent
    };


    return (
        showInput && (
            <div className={`${style.checkBox} ${style.inputItem}`}>
                <Icon name="check_box_outline_blank" className={style.icon} />
     
                <div className={style.input}>
                    <input
                        ref={inputRef}
                        name="checkBoxText"
                        type="text"
                        value={inputText}
                        onChange={handleInputChange}
                        {...rest} 
                    />
                </div>
                <Icon onClick={deleteItem} name="close" className={`${style.close} ${style.icon}`} />

            </div> )
    );
}