import ContentLayout from "../ContentLayout";
import NoData from "../NoData";



export default function Reminder() {
    return (
        <ContentLayout>
            <NoData icon="notifications" text="Notes with upcoming reminders appear here" />
        </ContentLayout>
    );
  
}