import style from "../styles/TextData.module.scss";

export default function TextData({note}) {
    const {title, text} = note;
    return (
        <div className={style.textNote} >
            <div className={style.title}>
                <h3>{title}</h3>
            </div>
            <div className={style.text}>
                <p> {text}</p>
            </div>
        </div>
    );

}