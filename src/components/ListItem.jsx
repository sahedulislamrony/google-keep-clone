import { useData } from "../contexts/DataContext";
import update from "../hooks/useUpdateNote";

export default function ListItem({item ,index,  note}) {
    const {isChecked, text  } = item;
    const {location} = note;
    const { setTriggerReload } = useData();

    let handleChange = async () => {
        item = {
            ...item,
            isChecked: !isChecked,
        };
        note  = {
            ...note,
            items: [
                ...note.items.slice(0, index),
                item,
                ...note.items.slice(index + 1),
            ],
        };
        await update(note, location);
        setTriggerReload(prevState => !prevState);
        console.log("Item updated");
    };

    return (
        <li>
            <input type="checkbox" checked={isChecked} onChange={handleChange} /><label htmlFor="">{text}</label>
        </li>
    );

}