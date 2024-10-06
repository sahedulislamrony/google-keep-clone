import { useLocation } from "react-router-dom";
import style from "../../styles/TopNavbar.module.scss";
import CenterMenu from "./CenterMenu";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";


// Desc: Top Navbar component
export default function TopNavbar({setMinimize}) {
    const {pathname} = useLocation();
    let path = pathname.split("/")[1] ;
    path = path === "login" || path === "signup" || path === "search" || path === "404" ? "" : path;


    return (
        <header>
            <div className={style.content}>
                <LeftMenu displayLogo={!path} text={path} setMinimize={setMinimize} />
                <CenterMenu />
                <RightMenu />
            </div>
        </header>
    );

}
