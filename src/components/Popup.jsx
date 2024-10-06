import style from "../styles/Popup.module.scss";

export default function Popup({children}) {

    return (
        <div className={style.popup}>
            <div className={style.popup__content}>
                {children}
            </div>
        </div>
    );
}
