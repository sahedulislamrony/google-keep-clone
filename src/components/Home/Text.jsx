
import { useEffect, useRef, useState } from "react";
import style from "../../styles/Text.module.scss";

export default function TextNote({focus , ...rest}) {
    let [focusStatus, setFocusStatus] = useState(focus);
    let inputRef =  useRef();


    useEffect(() => {
        if(focusStatus && inputRef.current) {
            inputRef.current.focus();
            setFocusStatus(false);
        }
     
    },[inputRef, focusStatus]);
    
    let handleHeight = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    };

    return (
        <div className={style.textArea}>
            <textarea
                {...rest}
                placeholder="Take a note..."
                onInput={handleHeight}
                ref={inputRef}
            ></textarea>
        </div>

    );

}