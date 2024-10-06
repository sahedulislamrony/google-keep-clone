
import { useData } from "../../contexts/DataContext";
import DataComponent from "../DataComponent";
import InputComponent from "../Home/InputComponent";
import ContentLayout from "./../ContentLayout";
import Loading from "./../Loading";
import NoData from "./../NoData";

import useGetNoteData from "../../hooks/useGetNoteData";

export default function Home() {
    
    const {triggerReload} = useData();
    const {data:notes , loading } = useGetNoteData("notes",triggerReload);

    return (
        <ContentLayout>
            <InputComponent />       
            <DataComponent type="notes" notes={notes} /> 
            {!loading && ( !notes || notes?.length <= 0) && <NoData icon="lightbulb" text="Notes you add appear here" />}
            {loading && ( !notes || notes?.length <= 0)  && <Loading />}
        </ContentLayout>
     
  
    );


}