import { Link } from "react-router-dom";
import style from "../styles/Anonymus.module.scss";

export default function Anonymus() {

    return (
        <div className={style.buttons}>
            <Link to="/login">
                <button>Login</button>
            </Link>

            <Link to="/signup">
                <button>Create Account</button>
            </Link>
        </div>
    );

}