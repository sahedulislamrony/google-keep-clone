import { useEffect, useRef, useState } from "react";
import style from "../styles/Input.module.scss";
import Icon from "./Icon";

export default function Input({icon ,focus = false , label, showVisibility, ...rest}) {
    let [showPassword, setShowPassword] = useState(false);
    let [focusStatus, setFocusStatus] = useState(focus);
    let inputRef =  useRef();

    let handleClick = () => { 
        inputRef.current.type = showPassword ? "text" : "password";
        setShowPassword(prev => !prev);

    };
  
    useEffect(() => {
        if(focusStatus && inputRef.current) {
            console.log("Focus");
            inputRef.current.focus();
            setFocusStatus(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

   

    return (
        <div className={style.input}>

            <label htmlFor={label}>{label}</label>
            <div className={style.inputBox}>
                <Icon name={icon} className={style.icon} />
                <input  {...rest} ref={inputRef} />
                {  showVisibility && (
                    <>
                        { showPassword &&  <Icon name="visibility" className={`${style.icon} ${style.showPss}`} onClick={handleClick} />}
                        { !showPassword &&  <Icon name="visibility_off" className={`${style.icon} ${style.showPss}`} onClick={handleClick} />}
                    </>
        
                )}

            </div>
        </div>
    );
}