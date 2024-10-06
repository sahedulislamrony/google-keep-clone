import style from "../styles/SearchLargeScreen.module.scss";
import Icon from "./Icon";
import MainSearch from "./MainSearch";

export default function SearchLargeScreen({goToSearch,goToHome,reset,close}) { 
  

    let handleClick = () => {
        reset();
        goToHome();
        
    };
    return (

        <div className={style.search}>
            <Icon className={style.icon} name="search" onClick={goToSearch} />
            <MainSearch className={style.inputBox} goToSearch={goToSearch} />
            {!close &&   <Icon className={style.icon} name="close" onClick={handleClick} />}
        </div>
    );
}
