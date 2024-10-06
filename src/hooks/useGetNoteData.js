import { getAuth } from "firebase/auth";
import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";


export default function useGetNoteData(location,reload) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const { currentUser } = getAuth();
    const { uid } = currentUser;

    useEffect(() => {
        async function fetchData() {
            const db = getDatabase();
            const dataRef = ref(db, `user/${uid}/${location}`);
            const dataQuery = query(dataRef, orderByKey());

            try {
                setLoading(true);

                const snapshot = await get(dataQuery);
                setLoading(false);

                if (snapshot.exists()) {

                    let obj = snapshot.val();
                    // populate with id 
                    Object.keys(obj).forEach(key => {
                        obj[key].id = key;
                    });

                    let data = Object.values(obj).reverse(); // show the last in first
                   
                    setData(data);
                } else {
                    setData([]);
                }
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        }

        fetchData();
    }, [location, uid,reload]);

    return {
        loading,
        data,
    };
}

