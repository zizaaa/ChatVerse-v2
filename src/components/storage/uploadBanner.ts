import { storage } from "../../firebase/firebase";
import { ref, uploadBytes,getDownloadURL } from "firebase/storage" 

async function uploadBanner(data:any){

    const storageRef = ref(storage, `userImages/${data.uid}/banner/${data.banner.name}`);

    const metadata: any = {
        contentType: 'image/jpeg',
    };
    
    // Upload the file and metadata
    const uploadTask = await uploadBytes(storageRef, data.banner, metadata);

    const pathReference = ref(storage, `${uploadTask.metadata.fullPath}`);

    return getDownloadURL(pathReference)
    .then((url) => {
        return url
    })
    .catch((error) => {
        console.error("Error retrieving image:", error);
    });
}

export default uploadBanner;