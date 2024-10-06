import { useData } from "../../contexts/DataContext";
import useGetNoteData from "../../hooks/useGetNoteData";
import removeNote from "../../hooks/useRemoveNote";
import style from "../../styles/Trash.module.scss";
import ContentLayout from "../ContentLayout";
import DataComponent from "../DataComponent";
import Loading from "../Loading";
import NoData from "../NoData";

export default function Trash() {
    const {triggerReload , setTriggerReload} = useData();
    const {data:notes , loading } = useGetNoteData("trash",triggerReload);

    async function emptyTrash() {
        notes.forEach(async (note) => {
            await removeNote("trash",note.id);
        },
        );
        setTriggerReload(prev => !prev);
    }
    return (
        <ContentLayout>
            <div className={style.topText}>
                <h2 className={style.text}>Notes in Trash are deleted after 7 days.</h2>
                <button className={style.btn} onClick={emptyTrash}>empty trash</button>
            </div>
            
            <DataComponent notes={notes} type="trash" />
            {!loading && ( !notes || notes?.length <= 0)&& <NoData icon="delete" text="No notes in Trash" />}
            {loading && ( !notes || notes?.length <= 0)  && <Loading />}
        </ContentLayout>
    );
    
}