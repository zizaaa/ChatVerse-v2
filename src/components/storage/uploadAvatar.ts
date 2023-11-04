import { storage } from "../../firebase/firebase";
import { ref, uploadBytes,getDownloadURL } from "firebase/storage" 

async function uploadAvatar(data:any){

    const storageRef = ref(storage, `userImages/${data.uid}/avatar/${data.avatar.name}`);

    const metadata: any = {
        contentType: 'image/jpeg',
    };
    
    // Upload the file and metadata
    const uploadTask = await uploadBytes(storageRef, data.avatar, metadata);

    const pathReference = ref(storage, `${uploadTask.metadata.fullPath}`);

    return getDownloadURL(pathReference)
    .then((url) => {
        return url
    })
    .catch((error) => {
        console.error("Error retrieving image:", error);
    });
}

export default uploadAvatar;