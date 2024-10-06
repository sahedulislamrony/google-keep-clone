import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import "../firebase";

export  async function useUpdateNote(data,path) {

    const { currentUser } = getAuth();
    let { uid } = currentUser;
    const db = getDatabase();
    
    const {id} = data;
    const noteRef = ref(db, `user/${uid}/${path}/${id}`); 
    try {
        await set(noteRef, data);
        return true;
    }catch(err) {
        return new Error(err);
    }
    
   

    
   
}

export default async function update(data,path) {
    data = {
        ...data,
        meta: {
            ...data.meta,
            lastModified: Date.now(),
        },
    };

    await useUpdateNote(data,path);

}
    
   


