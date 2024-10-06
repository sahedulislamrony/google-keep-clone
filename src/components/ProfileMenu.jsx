
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import style from "../styles/ProfileMenu.module.scss";
import Icon from "./Icon";

export default function ProfileMenu({user,...rest}) {
    let { displayName, photoURL  , email} = user;
    let { logout } = useAuth();
    let [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    let handleClick = async () => {

        try {
            setLoading(true);
            await logout();
            navigate("/login");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    };

    return (
        <div className={style.profileMenu} {...rest}>
            <div className={style.img}>
                <img src={photoURL} alt="Profile" />
            </div>
            <div className={style.info}>
                <h2>{displayName}</h2>
                <h3>{email}</h3>
            </div>
            <button className={style.logout} onClick={handleClick} disabled={loading}> 
                { loading && <h4>loading...</h4>}
                { !loading && <>
                    <h4>logout</h4> <Icon name="logout" className={style.icon} />
                </>
                }
            </button>
        </div>
    );

}