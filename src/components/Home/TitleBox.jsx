import style from "../../styles/TitleBox.module.scss";
import Icon from "../Icon";

export default function TitleBox({isPinned,handlePin , ...rest} ) {
    let pinStyle = isPinned ?` ${style.pinned} ${style.icon}` : style.icon;

    return (
        <div className={style.titleBox}>
            <div className={style.input}>
                <input type="text" placeholder="Title"   {...rest} />
            </div>
            <Icon name="keep"  className={pinStyle} onClick={handlePin} />
        </div> 
    );

}