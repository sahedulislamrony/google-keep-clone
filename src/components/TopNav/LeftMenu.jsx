import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import style from "../../styles/LeftMenu.module.scss";
import Icon from "../Icon";

export default function LeftMenu({displayLogo , text,setMinimize}) {
   

    let {currentUser} = useAuth();

    let changeMenu = () => { 
        if (currentUser) {
            setMinimize(prevState => !prevState);
        }
        
    };

    return ( 
        <div className={style.left}>
   
            <Icon className={style.menu} name="menu" onClick={changeMenu} />
       
            <Link to="/" >
                <div className={style.logo}>
                    {displayLogo && 
                <div className={style.logoImg}>
                    <img src="/img/logo.png" alt="Google Keep clone" />
                </div>
                    }
                    <h1>{text == "" ? "keep" : text}</h1>
                </div>
            </Link>
     
        </div>
    );
}

// LeftMenu.propTypes = {
//   displayLogo: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired,
// };
