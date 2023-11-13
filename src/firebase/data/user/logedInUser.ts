import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

async function logedInUser(userUId: unknown) {
    try {
        const documentRef = doc(db, 'users', userUId); // Update the collection name
        const documentSnapshot = await getDoc(documentRef);

        if (documentSnapshot.exists()) {
            const documentData = documentSnapshot.data();
            return documentData;
        } else {
            console.log("User not found.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching document:", error);
        throw error;
    }
}

export default logedInUser;
