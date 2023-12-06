import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore"; 
import { db } from "./firebase";
import userCookies from "../components/cookies/userCookies";
import axios from "axios";

function googleAuth(){
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const env = import.meta.env;
    const uri = env.VITE_REACT_SERVER_URL;

    signInWithPopup(auth, provider)
    .then(async(result) => {

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);

        const user = result.user;

        const userDocRef = doc(db, "users", user.uid); // Reference to the user's document
        const anonymousMessageDocRef = doc(db, "anonymousMessage", user.uid)

        const userDocSnapshot = await getDoc(userDocRef);
        const anonymousMessageDocSnapShot = await getDoc(anonymousMessageDocRef);
    
        if (!userDocSnapshot.exists() && !anonymousMessageDocSnapShot.exists()) {
            // The document doesn't exist, so create it
            await axios.post(`${uri}/api/createSecretMessage`)
            .then(async(res)=>{
                // The document doesn't exist, so create it
                await setDoc(userDocRef, {
                    username: user.displayName,
                    name: user.displayName,
                    email: user.email,
                    avatar:user.photoURL,
                    banner:'',
                    secretMessageID:res.data.secretMessageId,
                    accessTOKEN:res.data.accessToken
                });
            })
            .catch((error)=>{
                return error.message;
            })
    
            doc(db, "users", userDocRef.id); // Get the document reference
            doc(db, "anonymousMessage", userDocRef.id)

            userCookies(user.uid, credential.idToken);
            
        } else {
            userCookies(user.uid, credential.idToken);
        }

        location.reload()
    }).catch((error) => {
        console.error(error)
    });
}

export default googleAuth