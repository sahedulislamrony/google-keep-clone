import style from "../../styles/InputComponent.module.scss";
// import Icon from "../Icon";

import ClickBox from "./ClickBox";
import ListNote from "./LIstNote";
import TextNote from "./TextNote";

import { useState } from "react";


export default function InputComponent() {

    let [showTextBox, setShowTextBox] = useState(false);
    let [showCheckBox, setShowCheckBox] = useState(false);
    // let [showImage, setShowImage] = useState(false);

    let chnageTextBox = () => {
        setShowTextBox(true);
        setShowCheckBox(false);
    };
    let chnageCheckBox = () => {
        setShowTextBox(false);
        setShowCheckBox(true);
    };

    let closeInput = () => { 
        setShowTextBox(false);
        setShowCheckBox(false);
    };

    return (
        <div className={style.inputSection}>
            { !showTextBox && !showCheckBox && <ClickBox showTextBox={chnageTextBox} showCheckBox={chnageCheckBox}  />}
     

            {(showTextBox || showCheckBox) && (
                <div className={style.inputBox}>

                    {showTextBox && <TextNote closeInput={closeInput} /> }
                    {showCheckBox &&  <ListNote closeInput={closeInput} />}

                </div>
            )}
        </div>
    );
}