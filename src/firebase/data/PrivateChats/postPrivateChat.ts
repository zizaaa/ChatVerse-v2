import { collection, addDoc, doc } from "firebase/firestore"; 
import { db } from "../../firebase";
import userUID from "../../../components/cookies/userUID";

async function postPrivateChat(message) {
    
    const generateTimestamp = () => {
        const currentTimestamp = new Date();
        return currentTimestamp.toISOString();
    };

    const messageData = {
        message: message.message,
        reactions: [],
        senderUID: userUID(),
        timestamp: generateTimestamp(),
    };

    // Create a document reference with a specific ID
    const privateConversationDocRef = doc(db, "privateConversation", message.conversationID);

    // Add the message data to the "message" subcollection
    await addDoc(collection(privateConversationDocRef, "message"), messageData);
}

export default postPrivateChat;
