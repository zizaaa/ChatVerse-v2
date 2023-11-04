import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

async function getUser(userUId: unknown) {
    const userDocRef = doc(db, "users", userUId);

      try {
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          return {
            name:userDocSnapshot.data().name,
            username:userDocSnapshot.data().username,
            avatar:userDocSnapshot.data().avatar
          };
        } else {
          return(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        return(null);
      }
}

export default getUser;
