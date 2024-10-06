import style from "../styles/ListData.module.scss";
import ListItem from "./ListItem";

export default function ListData({note}) {
    const {title, items} = note;

    return (
        <div className={style.listNote}>
            <div className={style.title}>
                <h3>{title}</h3>
            </div>
            <ul>

                { items?.map((item,index) => {
                    return <ListItem key={index} index={index} item={item} note={note} />;
                })
                }
       
            </ul>
        </div>
    );

}