import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase";
import userUID from "../../../components/cookies/userUID";

async function checkChatHeads(id) {
    const usersChatHeadsDocRef = doc(db, "usersChatHeads", userUID());

    try {
        const userDocSnapshot = await getDoc(usersChatHeadsDocRef);
        if (userDocSnapshot.exists()) {
            const conversationID = `${userUID()}${id}`;
            const userConvo = userDocSnapshot.data().chatHeads?.find(data => data.userID === id);
            console.log(userConvo)
            if (!userConvo) {
                const otherUsersChatHeadsDocRef = doc(db, "usersChatHeads", id);
                
                // Update the document with the new chat head
                await updateDoc(usersChatHeadsDocRef, {
                    chatHeads: arrayUnion({ conversationID, userID: id })
                });

                await updateDoc(otherUsersChatHeadsDocRef, {
                    chatHeads: arrayUnion({ conversationID, userID: userUID() })
                });

                return conversationID;
            }

            return userConvo.conversationID;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}

export default checkChatHeads;
