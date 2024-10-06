import { useData } from "../contexts/DataContext";
import { useView } from "../contexts/ViewContext";
import update from "../hooks/useUpdateNote";
import style from "../styles/BgStyle.module.scss";

export default function BgStyle({setBg,note,setShowBgStyle}) {
    let { isGridView } = useView();
    let viewStyle = isGridView ? style.grid_view : "";
    const { setTriggerReload } = useData();

    // Function to handle clicks and access the data-value
    async function handleClick(e) {

        try {
            const colorValue = e.currentTarget.getAttribute("data-value"); // currentTarget for target the  element attested to the listener
            setBg(colorValue);
            note = {
                ...note,
                bg: colorValue,
            };
            const location = note.location;
            
            setShowBgStyle(false);
            await update(note, location);
            setTriggerReload(prevState => !prevState);
            
        }catch(err) {
            console.log(err);
        }
       
    }

    return (
        <div className={`${style.bgStyle} ${viewStyle}`}>
            <div className={style.colors}>
                
                <div className={style.color} onClick={e => handleClick(e)} data-value="" >
                    <span className="material-symbols-outlined">format_color_reset</span>
                </div>
                <div className={style.color} onClick={e => handleClick(e)} data-value="#faafa8" ></div>
                <div className={style.color} onClick={e => handleClick(e)} data-value="#f39f76" ></div>
                <div className={style.color} onClick={e => handleClick(e)} data-value="#fff8b8" ></div>
                <div className={style.color} onClick={e => handleClick(e)} data-value="#e2f6d3" ></div>
                <div className={style.color} onClick={e => handleClick(e)} data-value="#b4ddd3" ></div>
                <div className={style.color} onClick={e => handleClick(e)} data-value="#d4e4ed" ></div>
                <div className={style.color} onClick={e => handleClick(e)} data-value="#aeccdc" ></div>
                <div className={style.color} onClick={e => handleClick(e)} data-value="#d3bfdb" ></div>
                <div className={style.color} onClick={e => handleClick(e)} data-value="#f6e2dd" ></div>
                <div className={style.color} onClick={e => handleClick(e)} data-value="#e9e3d4" ></div>
                <div className={style.color} onClick={e => handleClick(e)} data-value="#efeff1" ></div>
            </div>
        </div>
    );
}
