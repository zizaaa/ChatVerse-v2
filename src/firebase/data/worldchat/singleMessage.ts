// singleMessage.js
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

async function singleMessage(documentId) {
    try {
        const documentRef = doc(db, 'worldChats', documentId); // Update the collection name
        const documentSnapshot = await getDoc(documentRef);

        if (documentSnapshot.exists()) {
            const documentData = documentSnapshot.data();
            return documentData;
        } else {
            console.log("Document not found.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching document:", error);
        throw error;
    }
}

export default singleMessage;
