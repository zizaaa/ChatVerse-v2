import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../firebase";
import userUID from "../../../components/cookies/userUID";
import worldChatImgs from "../../../components/storage/worldChatImgs";

async function postworldChat(message){

    const generateTimestamp = () => {
        const currentTimestamp = new Date();
        return currentTimestamp.toISOString()
    };

    const file = await worldChatImgs(message.file)

    const messageData = {
        message: message.message === '👋' && file ? '':message.message,
        file:file ? file:'',
        reactions: [],
        senderUID: userUID(),
        type:message.type,
        replyTo:message.replyTo,
        timestamp: generateTimestamp()
    };

    // Set the timestamp as the document ID
    await addDoc(collection(db, "worldChats"), messageData);
}

export default postworldChat;
