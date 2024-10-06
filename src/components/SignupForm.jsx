import { useAuth } from "../contexts/AuthContext";
import style from "../styles/Form.module.scss";
import Input from "./Input";


import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
    let { withEmail } = useAuth();
    let navigate = useNavigate();
    let [error, setError] = useState(null);
    let [loading, setLoading] = useState(false);

    // input values 
    let [email, setEmail] = useState("");
    let [password1, setPassword1] = useState("");
    let [password2, setPassword2] = useState("");
    let [username, setUsername] = useState("");



    async function handleSignup(e) {
        e.preventDefault();

        // client side validation
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        
        
        if(!username) {
            return setError("Please enter your name");
        }else if(!regex.test(email)) {
            return setError("Invalid email address");
        }
        else if(password1 !== password2) {
            return setError("Passwords do not match");
        }else if(password1.length < 6) { 
            return setError("Password must be at least 6 characters");
        }


        try {
            setError(null);
            setLoading(true);
            await withEmail(email, password1, username);
            setLoading(false);

            // redirect to home page
            navigate("/",{ replace: true });
        } catch (error) {
            setLoading(false);
            setError("There was an error creating your account");
            console.log(error);
        }

       


    }

    return (
        <div className={style.form}>
            <form onSubmit={handleSignup}>
         
                <Input icon="person" focus={true} type="text" placeholder="Full name" label="full name"  value={username} onChange={e => setUsername(e.target.value)} />
                <Input icon="alternate_email" type="email" placeholder="example@gmail.com" label="email" value={email} onChange={e => setEmail(e.target.value)}  />
                <Input icon="lock" showVisibility={true} type="password" placeholder="Enter a password" label="password" value={password1} onChange={e => setPassword1(e.target.value)} />
                <Input icon="lock"  showVisibility={true}  type="password" placeholder="Confirm password" label="confirm password" value={password2} onChange={e => setPassword2(e.target.value)} />

                <div className={style.errMsg}>
                    {error && <p>{error}</p>}
                </div>
                      
                <button type="submit" disabled={loading}>{loading ?"Loading..." : "Create New Account"} </button>
            </form>
     
        </div>
    );
}