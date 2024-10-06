import { useState } from "react";
import style from "../styles/SearchSmallScreen.module.scss";
import Icon from "./Icon";
import MainSearch from "./MainSearch";


export default function SearchSmallScreen({goToSearch,goToHome , reset}) {
    let [active, setActive] = useState(false);

    let toggleActive = () => { 
        setActive(prevState => !prevState);
        goToHome();
    };

    return (
    //  <!-- toggole active class here  -->
        <div className={style.searchSmallDevice}>
            {  active && (
                <div className={style.searchSM}>
                    <Icon className={style.icon} name="keyboard_backspace" onClick={toggleActive} />
                    <MainSearch className={style.inputBox} focus={true} goToSearch={goToSearch} />
                    <Icon className={style.icon} name="close" onClick={reset}/>
                </div>)}
 
            {!active && <Icon className={`${style.icon} ${style.smSearch}`} name="search" onClick={() => {toggleActive(); goToSearch();}}  />}
        </div>
    );
}