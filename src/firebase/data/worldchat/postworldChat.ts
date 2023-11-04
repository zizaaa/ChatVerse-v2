import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../firebase";
import userUID from "../../../components/cookies/userUID";

async function postworldChat(message: { message: any; }){

    const generateTimestamp = () => {
        const currentTimestamp = new Date();
        return currentTimestamp.toISOString()
    };

    const messageData = {
        message: message.message,
        reactions: [],
        senderUID: userUID(),
        timestamp: generateTimestamp()
    };

    // Set the timestamp as the document ID
    await addDoc(collection(db, "worldChats"), messageData);
}

export default postworldChat;
