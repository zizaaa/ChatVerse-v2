import { storage } from "../../firebase/firebase";
import { ref, uploadBytes,getDownloadURL } from "firebase/storage" 

async function worldChatImgs(file:any){
    console.log('No file, returning now...')
    if(!file) return;
    console.log('has file')
    const storageRef = ref(storage, `globalChatImgs/${file.name}`);

    const metadata: any = {
        contentType: 'image/jpeg/gif',
    };
    
    // Upload the file and metadata
    const uploadTask = await uploadBytes(storageRef, file, metadata);

    const pathReference = ref(storage, `${uploadTask.metadata.fullPath}`);

    return getDownloadURL(pathReference)
    .then((url) => {
        return url
    })
    .catch((error) => {
        console.error("Error retrieving image:", error);
    });
}

export default worldChatImgs;