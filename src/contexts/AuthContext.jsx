
import {
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    FacebookAuthProvider,
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    setPersistence,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    TwitterAuthProvider,
    updateProfile,
} from "firebase/auth";
import "../firebase";

import { createContext, useContext, useEffect, useState } from "react";



let AuthContext = createContext();
const defaultImg = "/img/default.png";


// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}



export default function AuthProvider({children}) {
    let [currentUser, setCurrentUser] = useState(null);
    let [loading, setLoading] = useState(true);


    useEffect(() => {
        const auth = getAuth();
        let unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        });

        
        return unsubscribe;
    }, []);

   

    // sign up using email and password
    async function withEmail(email, password , username) { 
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, {
            displayName: username,
            photoURL: defaultImg,
        });

        const user = auth.currentUser;
        setCurrentUser({...user});
    
    }

    // signup using google
    async function withGoogle() {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        let profilePicUrl = user.photoURL;
        const highQualityProfilePicUrl = profilePicUrl?.replace(/s\d+-c/, "s512-c");
        profilePicUrl = highQualityProfilePicUrl;
  
        // update local state
        setCurrentUser({...user
            , photoURL: profilePicUrl,
        });
        // update server profile
        await updateProfile(user, {
            photoURL: profilePicUrl,
        });
        
        
    }

    //  with facebook
    async function withFacebook() {
        const auth = getAuth();
        const provider = new FacebookAuthProvider();

        // for requesting additional scopes
        provider.addScope("public_profile");  

        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const accessToken = result._tokenResponse.oauthAccessToken;

        // request actual profile pic from facebook 
        const response = await fetch(`https://graph.facebook.com/me?fields=picture.width(720).height(720)&access_token=${accessToken}`);
        const data = await response.json();

        if(!data.error) {

            const profilePicUrl = data.picture.data.url; 
    
            // update local state
            setCurrentUser({...user, photoURL: profilePicUrl});

            // update server profile
            await updateProfile(user, {
                photoURL: profilePicUrl,
            });   
        }
    }

    // with github 
    async function withGithub() {
        const auth = getAuth();
        const provider = new GithubAuthProvider();
        return signInWithPopup(auth, provider);
    }

    // with twitter
    async function withTwitter() {
        const auth = getAuth();
        const provider = new TwitterAuthProvider();
        return await signInWithPopup(auth, provider);
    }

    // loging using email and password
    async function login(email, password , remember ) {
        const auth = getAuth();

        // set session persistence if remember is false
        if(!remember ){
            await setPersistence(auth, browserSessionPersistence);
        }
        return  signInWithEmailAndPassword(auth, email, password);
     
    }
   
    // logout
    async function logout() {
        const auth = getAuth();
        return signOut(auth);
    }




    let value = {
        currentUser,
        withEmail,
        withGoogle,
        withFacebook,
        withGithub,
        withTwitter,
        login,
        logout,

    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );

}