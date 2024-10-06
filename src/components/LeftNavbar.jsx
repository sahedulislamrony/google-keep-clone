import { Link, useLocation } from "react-router-dom";
import style from "../styles/LeftNavbar.module.scss";
import Icon from "./Icon";
// import { useEffect } from "react";

export default function LeftNavbar({ minimize }) { 
    const {pathname} = useLocation();
    let path = pathname.split("/")[1] ;
    path = path === "" || path === "search" ? "note" : path;


    let minimizeClass = minimize ? style.minimize : "";
    let active = style.active;
    let  styleClass = {
        note: path === "note" ? active : "",
        reminder: path === "reminder" ? active : "",
        label: path === "label" ? active : "",
        archive: path === "archive" ? active : "",
        trash: path === "trash" ? active : "",
    };

    


    return (
    // add minimize class here 
        <section role="navigation" className={minimizeClass}>
            <div className={style.leftNav}>
                <div className={style.wrapper}>
                    <ul>
                        <li className={styleClass.note}>
                            <Link to="/">
                                <Icon className={style.icon} name="lightbulb" />
                                <h1>Notes</h1>
                            </Link>
                        </li>
                        {/* no server for  tracking reminder */}
                        <li className={styleClass.reminder} >
                            <Link to="/reminder">
                                <Icon className={style.icon} name="notifications" />
                                <h1>Reminders</h1>
                            </Link>
                        </li>
                      
                        {/* label functionality will be added in v2.0 */}
                        <li  className={styleClass.label}>
                            <Link to="/label">
                                <Icon className={`${style.icon} ${style.edit}`} name="edit" />
                                <h1>Edit labels</h1>
                            </Link>
                        </li>
                        <li className={styleClass.archive} >
                            <Link to="/archive">
                                <Icon className={style.icon} name="archive" />
                                <h1>Archive</h1>
                            </Link>
                        </li>
                        <li className={styleClass.trash}>
                            <Link to="/trash">
                                <Icon className={style.icon} name="delete" />
                                <h1>Trash</h1>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={style.copyright}>
                <h2>
                    <Link to="/"> Copyright &copy; 2024 || All Rights Reserved </Link>
                </h2>
            </div>
        </section>


    );

}