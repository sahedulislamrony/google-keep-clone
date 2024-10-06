import style from "../styles/NoData.module.scss";
import Icon from "./Icon";

export default function NoData({icon, text}) {

    return (
        <div className={style.noData}>
            <Icon name={icon} className={style.icon} />
            <p className={style.text}>{text}</p>
        </div>
    );
}