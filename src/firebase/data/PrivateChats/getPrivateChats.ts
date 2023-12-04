import { onSnapshot, doc, query, where, collection } from "firebase/firestore"; 
import { db } from "../../firebase";

function getPrivateChats(id, setData) {
    try {
        // Create a document reference for the privateConversation
        const privateConversationDocRef = doc(db, "privateConversation", id);

        // Create a query for the "message" subcollection with a filter for today's date
        const messageQuery = query(
            collection(privateConversationDocRef, "message"),
            where("timestamp", ">=", new Date().toISOString().split('T')[0])
        );

        // Set up a real-time listener for the query
        const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
            // Extract data and IDs from documents
            const dataWithIds = snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }));

            // Set the data in your state or perform other actions
            // console.log(dataWithIds)
            setData(dataWithIds);
        });

        // Return the unsubscribe function to clean up the listener when necessary
        return unsubscribe;
    } catch (error) {
        console.error("Error fetching private chat data:", error);
    }
}

export default getPrivateChats;
