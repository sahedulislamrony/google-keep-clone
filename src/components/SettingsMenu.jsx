import style from "../styles/SettingsMenu.module.scss";

export default function SettingsMenu() { 

    return (
        <div className={style.settings}>
            <ul>
                <li><a href="">settings</a></li>
                <li><a href="">enable dark theme</a></li>
                <li><a href="">send feedback</a></li>
                <li><a href="">help</a></li>
                <li><a href="">App downloads</a></li>
            </ul>
        </div>
    
    );
}