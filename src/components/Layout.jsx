import { useView } from "../contexts/ViewContext";
import TopNavbar from "./TopNav/TopNavbar";


export default function Layout({ children }) { 
    let {setMinimize} = useView();
  
    return (
        <>
            <TopNavbar setMinimize={setMinimize}/>
            {
                children
            }
     
        </>
    );
}