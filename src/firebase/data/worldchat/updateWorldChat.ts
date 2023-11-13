import { doc, updateDoc } from "firebase/firestore"; 
import { db } from "../../firebase";

async function updateWorldChat(messageId, updatedMessage) {
    try {
        const worldChatDocRef = doc(db, "worldChats", messageId);

        // Update the document with the new data
        await updateDoc(worldChatDocRef, {
            message:updatedMessage, // Spread the updated fields
        });

        console.log("Document updated successfully");
    } catch (error) {
        console.error("Error updating document:", error);
        throw error;
    }
}

export default updateWorldChat;
