import ContentLayout from "../ContentLayout";
// import DownloadFile from "../Temp";
import NoData from "../NoData";

export default function Label() {
    return (
        <ContentLayout>
            <NoData icon="label" text="No notes with this label yet" />
        </ContentLayout>
    );
    
}