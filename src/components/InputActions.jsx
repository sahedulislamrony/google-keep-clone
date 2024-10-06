import style from "../styles/InputActions.module.scss";
import Icon from "./Icon";

export default function InputActions({text,loading}) {
    return (
        <div className={style.inputActions}>
            <div className={style.inputIcons}>
                <Icon className={style.icon} name="undo" />
                <Icon className={style.icon} name="redo" />

        
            </div>
            <button id="addNote" type="submit" disabled={loading}>{loading ? "Loading...":text}</button>
        </div>
    );
}