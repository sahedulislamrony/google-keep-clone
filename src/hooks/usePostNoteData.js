import { getAuth } from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import "../firebase";

export  async function usePostNoteData(data,path) {

    const { currentUser } = getAuth();
    let { uid } = currentUser;
    const db = getDatabase();
    
    if(path == "notes") {
        data = {
            ...data,
            meta: {
                ...data.meta,
                created: Date.now(),
            },
        };
        const noteRef = ref(db, `user/${uid}/${path}`); 
        try {
            await push(noteRef, data);
            return true;
        }catch(err) {
            return new Error(err);
        }
    }else {
        const {id} = data;
        const noteRef = ref(db, `user/${uid}/${path}/${id}`); 
        try {
            await set(noteRef, data);
            return true;
        }catch(err) {
            return new Error(err);
        }
    }
   

    
   
}

export default async function addNote(data,path) {
    data = {
        ...data,
        meta: {
            ...data.meta,
            lastModified: Date.now(),
        },
    };

    await usePostNoteData(data,path);

}
    
   


