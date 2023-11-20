import { setDoc, doc, getDoc } from "firebase/firestore"; 
import { db } from "./firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import userCookies from "../components/cookies/userCookies";
import uploadAvatar from "../components/storage/uploadAvatar";
import uploadBanner from "../components/storage/uploadBanner";

async function registerUser(data:any){
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(async(userCredential) => {
        // Signed up 
        const user = userCredential.user;

        const userDocRef = doc(db, "users", user.uid); // Reference to the user's document
        const anonymousMessageDocRef = doc(db, "anonymousMessage", user.uid)
        const chatHeadsDocRef = doc(db,"usersChatHeads", user.uid)
        
        const userDocSnapshot = await getDoc(userDocRef);
        const anonymousMessageDocSnapShot = await getDoc(anonymousMessageDocRef);
        const chatHeadsDocSnapShot = await getDoc(chatHeadsDocRef);

        const datas = {
            uid:user.uid,
            avatar:data.avatar,
            banner:data.banner,
        }

        const avatar = await uploadAvatar(datas);
        const banner = await uploadBanner(datas);
    
        if (!userDocSnapshot.exists() && !anonymousMessageDocSnapShot.exists() && !chatHeadsDocSnapShot.exists()) {
            // The document doesn't exist, so create it
            await setDoc(userDocRef, {
                username: data.username,
                name: data.name,
                email: data.email,
                avatar,
                banner,
            });

            await setDoc(anonymousMessageDocRef, {
                messages:[]
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