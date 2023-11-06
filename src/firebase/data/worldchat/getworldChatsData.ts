import { useEffect, useState } from "react";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase"; 

function getworldChatsData(collectionName) {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Create a reference to the Firestore collection you want to listen to
        const collectionRef = collection(db, collectionName);

        // Get the current date in the format 'YYYY-MM-DD'
        const currentDate = new Date().toISOString().split('T')[0];

        // Listen for changes in the collection
        const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
            const updatedData: ((prevState: never[]) => never[]) | DocumentData[] = [];

            querySnapshot.forEach((doc) => {
                const documentData = doc.data();
                const documentDate = documentData.timestamp.split('T')[0]; // Extract date part

                // Check if the extracted date matches the current date
                if (documentDate === currentDate) {
                    updatedData.push({ id: doc.id, data: documentData });
                }
            });

            // Sort the data by timestamp in ascending order
            updatedData.sort((a, b) => {
                return a.data.timestamp.localeCompare(b.data.timestamp);
            });

            // Update your state with the new data
            setData(updatedData);
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, [collectionName]);

    return data;
}

export default getworldChatsData;
