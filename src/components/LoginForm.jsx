import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import style from "../styles/Form.module.scss";
import Input from "./Input";
export default function SignupForm() {

     
    let { login } = useAuth();
    let navigate = useNavigate();

     
    let [error, setError] = useState(null);
    let [loading, setLoading] = useState(false);

    // input values
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [remember, setRemember] = useState(false);
  



    let handleSubmit = async (e) => {
        e.preventDefault();

        // client side validation
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if(!regex.test(email)) {
            return setError("Invalid email address");
        } else if(password.length < 6) {
            return setError("Incorrect password");
        }

        try {
            setLoading(true);
            setError(null);
            await login(email, password,remember);
            setLoading(false);

            // redirect to home page
            navigate("/",{ replace: true });
        } catch (err) {
            setLoading(false);

            const errorCode = err.code;
            const errorMessage = err.message;

            if (errorCode === "auth/wrong-password") {
                setError("Invalid password.");
            } else if (errorCode === "auth/user-not-found") {
                setError("No user found with this email.");
            } else if (errorCode === "auth/invalid-email") {
                setError("Invalid email format.");
            }else if(errorCode === "auth/too-many-requests") {
                setError("Too many requests. Try again later.");

            }else if(errorCode === "auth/invalid-credential") {
                setError("You have entered an invalid credential!");
            }
            else {
                console.error("Login error:", errorCode, errorMessage);
                setError("There was an error logging in!");
            }
        }
    };


    return (
        <div className={style.form}>
            <form onSubmit={handleSubmit}>
                <Input icon="alternate_email" type="email" label="email" placeholder="user@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />
                <Input icon="lock" showVisibility={true} label="password" type="password" placeholder="Enter a password" value={password} onChange={e => setPassword(e.target.value)}   />
               
                <div className={style.actions}>
                    <div className={style.rememberMe}>
                        <input type="checkbox" value={remember} onChange={(e) => setRemember(e.target.checked)} />
                        <label >Remember Me</label>
                    </div>
                    <div className={style.forgotPassword}>
                        <a href="#">Forgot Password?</a>
                    </div>
                </div>
                <div className={style.errMsg}>
                    {error && <p>{error}</p>}
                </div>
                <button type="submit" disabled={loading}>{ loading ?"Loading...":"Log In"}</button>

            </form>
      
        </div>
    );
}
