 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import style from "../styles/SignInLayout.module.scss";
import LoginForm from "./LoginForm";
import SignInMethod from "./SignInMethod";
import SignupForm from "./SignupForm";

export default function SignInLayout({login = false ,signup = false}) {
    let { withGoogle, withFacebook,withGithub , withTwitter} = useAuth();
    let navigate = useNavigate();
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);


    
    let text = login ? "in" : "up";
    let [showSignup, setShowSignup] = useState(false);
    let title = login ? "Continue with" : "Sign up with";

    let handleGoogleSignIn = async () => {
  
        try {
            setError(false);
            setLoading(true);
            await withGoogle();
            setLoading(false);

            // navigate to home page
            navigate("/",{ replace: true });
        } catch (error) {
            setLoading(false);
            setError(true);
            console.log(error);
        }
    };

    
    let handleFacebookIn = async () => {
        try {
            setError(false);
            setLoading(true);
            await withFacebook();
            setLoading(false);

            // navigate to home page
            navigate("/",{ replace: true });
        } catch (error) {
            setLoading(false);
            setError(true); 
            console.log(error);
        }
    };

    let handleGithub = async () => {
        try {
            setError(false);
            setLoading(true);
            await withGithub();
            setLoading(false);

            // navigate to home page
            navigate("/",{ replace: true });
        } catch (error) {
            setLoading(false);
            setError(true); 
            console.log(error);
        }
    };

    let handleTwitter = async () => {
        try {
            setError(false);
            setLoading(true);
            await withTwitter();
            setLoading(false);

            // navigate to home page
            navigate("/",{ replace: true });
        } catch (error) {
            setLoading(false);
            setError(true); 
            console.log(error);
        }
    };


    // disable class for buttons
    let signInMethodStyle = loading ?`${style.signInMethods} ${style.disable}` : style.signInMethods;

    return (
        <section role="main" className={style.main}>
             
            <div className={style.content}>
                {/* error message  */}
                {error && 
                <div className={style.error}>
                    <p>An error occurred. Please try again later. If the issue persists, 
                    kindly contact support at 
                    <a href="mailto:sahedul.dev@gmail.com">    sahedul.dev@gmail.com</a> for assistance.
                    </p>
                </div>}
               
                <div className={style.topHeading}>
                    <div className={style.logo}>
                        <img src="/img/logo.png" alt="logo" />
                    </div>
                    {login && <h1>Login into your accouunt</h1>}
                    {signup && <h1>Welcome to Google Keep Clone</h1>}
                    <h3>cloned by <a target="_blank" href="https://www.linkedin.com/in/sahedulislamrony/"> sahedul islam rony</a></h3>
                </div>
                <div className={signInMethodStyle} >
                    <SignInMethod title={title} type="google" onClick={handleGoogleSignIn}/>
                    <SignInMethod title={title} type="facebook"  onClick={handleFacebookIn} />
                    <SignInMethod title={title} type="twitter" onClick={handleTwitter} />
                    <SignInMethod title={title} type="github" onClick={handleGithub}  />
                    { signup && <SignInMethod title={title} type="email" onClick={()=> setShowSignup(true)} />}
                </div>
                
                { (login || showSignup) &&  <div className={style.alternateOption}>
                    <div className={style.line}>
                        <div className={style.line1}></div>
                        <div className={style.lineText}>{login?"or":"sign up"}</div>
                        <div className={style.line2}></div>
                    </div>
                </div>}

                {/* log in form or sign up form */}
                {login && <LoginForm />  }   
                {signup && showSignup && <SignupForm />  }            
                    
                <div className={style.bottomText}>
                    <div className={style.privacy}>
                        <p>By signing {text}, you are agreeing to our <a href="https://github.com/sahedulislamrony/google-keep-clone/blob/main/PrivacyPolicy.md"> privacy policy </a>and <a href="https://github.com/sahedulislamrony/google-keep-clone/blob/main/TermsOfUse.md">terms of use.</a> </p>
                    </div>
                    <div className={style.line}></div>
                    <div className={style.account}>
                        {login && <p>Don&#39;t have an account? <a href="/signup">Create account.</a></p>}
                        {signup &&  <p>Already have an account? <a href="/login">Log In.</a></p>}
                    </div>
                </div>
            </div>
       
        </section>

    );
}