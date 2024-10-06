import style from "../../styles/CenterMenu.module.scss";
import SearchView from "../SearchView";

export default function CenterMenu() {
    return (
        <div className={style.center}>
            <SearchView />
        </div>
    );
}