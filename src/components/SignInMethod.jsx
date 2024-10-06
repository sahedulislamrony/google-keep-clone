import style from "../styles/SignInMethod.module.scss";


export default function SignInMethod({title,type,...rest}) {
    return (
        <div className={style.box} {...rest} >
            <div className={style.icon}>
                <img src={`/img/${type}.png`} alt={type} />
            </div>
            <div className={style.text}>
                <h3>{title} <span>{type === "twitter" ? "twitter (X)" : type}</span></h3>
            </div>
        </div>
    );
}