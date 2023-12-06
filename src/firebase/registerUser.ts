import { setDoc, doc, getDoc } from "firebase/firestore"; 
import { db } from "./firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import userCookies from "../components/cookies/userCookies";
import uploadAvatar from "../components/storage/uploadAvatar";
import uploadBanner from "../components/storage/uploadBanner";
import axios from "axios";

async function registerUser(data:any){
    const env = import.meta.env;
    const uri = env.VITE_REACT_SERVER_URL;
    const auth = getAuth();

    return createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(async(userCredential) => {
        // Signed up 
        const user = userCredential.user;

        const userDocRef = doc(db, "users", user.uid); // Reference to the user's document
        const chatHeadsDocRef = doc(db,"usersChatHeads", user.uid)
        
        const userDocSnapshot = await getDoc(userDocRef);
        const chatHeadsDocSnapShot = await getDoc(chatHeadsDocRef);

        const datas = {
            uid:user.uid,
            avatar:data.avatar,
            banner:data.banner,
        }

        const avatar = await uploadAvatar(datas);
        const banner = await uploadBanner(datas);
    
        if (!userDocSnapshot.exists() && !chatHeadsDocSnapShot.exists()) {
                await axios.post(`${uri}/api/createSecretMessage`)
                .then(async(res)=>{
                    await setDoc(userDocRef, {
                        username: data.username,
                        name: data.name,
                        email: data.email,
                        avatar,
                        banner,
                        about:data.about,
                        secretMessageID:res.data.secretMessageId,
                        accessTOKEN:res.data.accessToken
                    });
                })
                .catch((error)=>{
                    return error.message;
                })

            await setDoc(chatHeadsDocRef, {})
    
            doc(db, "users", userDocRef.id);
            doc(db, "anonymousMessage", userDocRef.id)
            doc(db, "usersChatHeads", userDocRef.id)

            userCookies(user.uid, user.accessToken);
        } else {
            userCookies(user.uid, user.accessToken);
        }
        location.reload()
        return "Registration successful";
    })
    .catch((error) => {
        const errorMessage = error.message;
        
        // Return the error message
        return errorMessage;
    });
}

export default registerUser