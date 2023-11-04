import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import userCookies from "../components/cookies/userCookies";

async function signInUser(data: { email: any; password: any; }){
    const auth = getAuth();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        // Signed in 
        const user = userCredential.user;
        userCookies(user.uid, user.accessToken);
        location.reload()
    } catch (error) {
        return 'error';
    }
}

export default signInUser