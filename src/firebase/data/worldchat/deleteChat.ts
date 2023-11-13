import { doc, deleteDoc  } from "firebase/firestore";
import { db } from "../../firebase";

async function deleteChat(messageID){
    await deleteDoc(doc(db, "worldChats", messageID));
}

export default deleteChat