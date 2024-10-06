import { useState } from "react";
import style from "../styles/History.module.scss";
import { useAuth } from "./../contexts/AuthContext";
import Icon from "./Icon";


export default function History({note , setShowHistory,showMenu}) {
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuth();
    const {displayName} = currentUser;
    const {meta} = note;
    const {lastModified} = meta;
    const date = new Date(lastModified);
    const options = {
        month: "short",  // "Oct"
        day: "numeric",  // "2"
        hour: "numeric", // "4"
        minute: "numeric", // "19"
        hour12: true,  // Use 12-hour format (AM/PM)
    };
    const formattedDate = date.toLocaleString("en-US", options);

    let handlePopupClose = () => {
        setShowHistory(false);
        showMenu(false);
    };

    let handleDownload = () => {
        if(note.type == "text") {
            setLoading(true);
            const plainTextContent = `${note.title}\n\n${note.text}\n\nLast modified: ${formattedDate}`;
            const blob = new Blob([plainTextContent], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            const name = displayName.split(" ").join("_");
            link.download = `${name}_note.txt`; 
            link.click();
            URL.revokeObjectURL(url);
            setLoading(false);
        } else if(note.type == "list") {
            setLoading(true);

            const plainTextContent = `${note.title}\n\n${note.items.map(item => item.text).join("\n")}\n\nLast modified: ${formattedDate}`;


            const blob = new Blob([plainTextContent], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            const name = displayName.split(" ").join("_");
            link.download = `${name}_note.txt`; 
            link.click();
            URL.revokeObjectURL(url);
            setLoading(false);
        }

    };

    
    return (
        <div className={style.history}>
            <div className={style.title}>
                <h1>Version history</h1> <Icon name="close" className={style.icon} onClick={handlePopupClose} />
            </div>
            <p className={style.info}>Download a previous version of your note in text format.</p>

            <div className={style.content}>
                <div className={style.version}>
                    <div >
                        <div className={style.title}>
                            <Icon name="assignment" className={style.icon} />
                            <h2 className={style.date}>{formattedDate}</h2>
                        </div>
                        <p className={style.status}>current version</p>
                        <ul className={style.author}>
                            <li>{displayName}</li>
                        </ul>
                    </div>
                    <div className={style.download}>
                        <button className={style.btn} disabled={loading}    onClick={handleDownload}>{loading?"Loading...":"Download"}</button>
                    </div>
                </div>

                
            </div>
            <div className={style.bottom}>
                <button className={style.btn} onClick={handlePopupClose} >dismiss</button>
            </div>
        </div>
    );

}