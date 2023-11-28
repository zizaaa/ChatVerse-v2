import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase";

function getPrivateChats(id, setData) {
    const privateConversationDocRef = doc(db, "privateConversation", id);

    const unsubscribe = onSnapshot(privateConversationDocRef, (doc) => {
        if (doc.exists()) {
            const documentData = doc.data();
            const dataArray = Object.values(documentData);

            const currentDate = new Date().toISOString().split('T')[0];
            const filteredData = dataArray.filter(element => {
                const documentDate = element.timestamp.split('T')[0];
                return documentDate === currentDate;
            });

            setData(filteredData);
        } else {
            setData([]);
        }
    });

    return unsubscribe;
}

export default getPrivateChats;
