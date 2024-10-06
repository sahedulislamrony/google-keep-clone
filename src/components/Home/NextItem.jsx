import style from "../../styles/ListNote.module.scss";
import Icon from "../Icon";

export default function NextItem({showInput}) {

    return (

        <div className={`${style.checkBox} ${style.nextItem}`}>
            <Icon name="add" className={style.icon} />
            <div className={style.input}>
                <input
                    name="checkBoxText"
                    type="text"
                    placeholder="List item"
                    value=""
                    onClick={showInput}
                />
            </div>
            <Icon name="close" className={style.icon} />
        </div>
    );

}