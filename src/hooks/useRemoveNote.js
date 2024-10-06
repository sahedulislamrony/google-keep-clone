import { getAuth } from "firebase/auth";
import { getDatabase, ref, remove } from "firebase/database";
import "../firebase";

export  async function useRemoveNote(path,id) {

    const { currentUser } = getAuth();
    let { uid } = currentUser;
    const db = getDatabase();
    const noteRef = ref(db, `user/${uid}/${path}/${id}`); 
    
    try {
        await remove(noteRef);
        return true;
    }catch(err) {
        return new Error(err);
    }

    
   
}

export default async function removeNote(path,id) {

    await useRemoveNote(path, id);

}
    
   


