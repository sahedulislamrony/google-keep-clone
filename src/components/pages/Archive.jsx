import { useData } from "../../contexts/DataContext";
import useGetNoteData from "../../hooks/useGetNoteData";
import ContentLayout from "../ContentLayout";
import DataComponent from "../DataComponent";
import Loading from "../Loading";
import NoData from "../NoData";

export default function Archive() {
    const {triggerReload } = useData();
    const {data:notes , loading } = useGetNoteData("archive",triggerReload);

    
    return (
        <ContentLayout>
            <DataComponent notes={notes} type="archive" />
            {!loading && ( !notes || notes?.length <= 0) && <NoData icon="archive" text="Your archived notes appear here" />}
            {loading && ( !notes || notes?.length <= 0)  && <Loading />}
        </ContentLayout>
    );
    
}