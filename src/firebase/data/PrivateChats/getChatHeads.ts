// singleMessage.js
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import userUID from "../../../components/cookies/userUID";
import getUser from "../user/getUser";

async function getChatHeads(callback) {
    try {
        const documentRef = doc(db, 'usersChatHeads', userUID());
        
        // Set up a listener for real-time updates
        const unsubscribe = onSnapshot(documentRef, (documentSnapshot) => {
            if (documentSnapshot.exists()) {
                const documentData = documentSnapshot.data().chatHeads;

                if(documentData){
                    // Use Promise.all to wait for all getUser calls to complete
                    const userData = Promise.all(documentData.map(async data => {
                        const user = await getUser(data.userID);
                        return {
                            avatar: user?.avatar,
                            name: user?.name,
                            username: user?.username,
                            conversationID: data.conversationID
                        };
                    }));

                    // Invoke the callback with the updated data
                    userData.then((data) => {
                        callback(data);
                    });
                }
            } else {
                console.log("Document not found.");
                callback(null);
            }
        });

        // Return the unsubscribe function to clean up the listener
        return unsubscribe;
    } catch (error) {
        console.error("Error fetching document:", error);
        throw error;
    }
}

export default getChatHeads;
