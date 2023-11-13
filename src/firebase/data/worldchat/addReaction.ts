import { doc, getDoc, updateDoc, arrayRemove,arrayUnion } from "firebase/firestore"; 
import { db } from "../../firebase";

async function removeReaction(messageId, reaction) {
    try {
        const worldChatDocRef = doc(db, "worldChats", messageId);

        // Fetch the existing document
        const worldChatDoc = await getDoc(worldChatDocRef);

        if (worldChatDoc.exists()) {
            // Check if the reaction exists in the array
            const existingReactions = worldChatDoc.data().reactions || [];
            const reactionIndex = existingReactions.findIndex(
                (r) => r.reactionName === reaction.reactionName && r.reactionSender === reaction.reactionSender
            );

            if (reactionIndex !== -1) {
                // Update the document by removing the specified reaction
                await updateDoc(worldChatDocRef, {
                    reactions: arrayRemove(existingReactions[reactionIndex]),
                });

                console.log("Reaction removed successfully");
            } else {
                await updateDoc(worldChatDocRef, {
                    reactions: arrayUnion(reaction),
                });
            }
        } else {
            console.log("Document not found.");
        }
    } catch (error) {
        console.error("Error removing reaction:", error);
        throw error;
    }
}

export default removeReaction;

