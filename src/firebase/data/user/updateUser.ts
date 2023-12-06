import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import uploadAvatar from "../../../components/storage/uploadAvatar";
import uploadBanner from "../../../components/storage/uploadBanner";

async function updateUser(data) {
    const userDocRef = doc(db, "users", data.uid);

    try {
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {

            // Upload the new avatar and banner
            const avatar = data.avatar ? await uploadAvatar(data):userDocSnapshot.data().avatar;
            const banner = data.banner ? await uploadBanner(data):userDocSnapshot.data().banner;

            // Update the document with the new avatar and banner
            await updateDoc(userDocRef, {
                avatar,
                banner,
                name:data.name ? data.name:userDocSnapshot.data().name,
                about:data.about ? data.about:userDocSnapshot.data().about
            });

            console.log("User data updated successfully");
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error updating user data:", error);
        return null;
    }
}

export default updateUser;
