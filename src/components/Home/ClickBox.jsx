import style from "../../styles/ClickBox.module.scss";
import Icon from "../Icon";

export default function ClickBox({showTextBox,showCheckBox }) {

    return (
        <div className={style.clickBox}>
            <div className={style.click} onClick={showTextBox}>
                <h3>Take a note...</h3>
            </div>
            <Icon className={style.icon} name="check_box" onClick={showCheckBox} />
            <Icon className={style.icon} name="image" />
        
        </div>
    );

}