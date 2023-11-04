import { getAuth, sendPasswordResetEmail } from "firebase/auth";

async function resetPass(email){
    const auth = getAuth();
    try {
        await sendPasswordResetEmail(auth, email);
        return 'sent';
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return errorMessage;
    }
}

export default resetPass