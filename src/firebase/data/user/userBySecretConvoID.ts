import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

async function userBySecretConvoID(secretMessageID){
    try {
        const usersCollection = collection(db, "users");
        const usersQuery = query(usersCollection, where("secretMessageID", "==", secretMessageID));
        const snapshot = await getDocs(usersQuery);
    
        if (!snapshot.empty) {
            const userData = snapshot.docs[0].data();
            const userId = snapshot.docs[0].id;

            return {
                userId,
                avatar:userData.avatar,
                name:userData.name
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}

export default userBySecretConvoID;