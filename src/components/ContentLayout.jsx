import { useView } from "../contexts/ViewContext";
import LeftNavbar from "./LeftNavbar";

export default function ContentLayout({ children }) {
    let {minimize} = useView();

    return (
        <main>
            <LeftNavbar minimize={minimize}/>
            <section role="main">
                <div className="main"> {children} </div>
            </section>
        </main>
    );
}