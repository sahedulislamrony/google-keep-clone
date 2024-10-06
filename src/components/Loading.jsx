import style from "../styles/Loading.module.scss";
import Icon from "./Icon";

export default function Loading() {

    return (
        <div className={style.loading}>
            <Icon name="search" className={style.icon}  />
            <p className={style.text}>Loading...</p>
        </div>
    );
}