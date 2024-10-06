import { useAuth } from "../../contexts/AuthContext";
import style from "../../styles/RightMenu.module.scss";
import Anonymus from "../Anonymus";
import Profile from "../Profile";

export default function RightMenu() {
     
    let { currentUser } = useAuth();

   
    return (
        <div className={style.right}>
           
            {currentUser && <Profile user={currentUser} />}
            {!currentUser && <Anonymus />}
            
        </div>
    );

}