import { useEffect, useState } from "react"; // import useState and useEffect to manage background colors
import { useView } from "../contexts/ViewContext";
import style from "../styles/DataComponent.module.scss";
import Note from "./Note";

export default function DataComponent({ notes, type }) {
    let { isGridView } = useView();
    let viewStyle = isGridView ? style.grid_view : "";

    // Initialize state for note background colors
    const [noteBgColors, setNoteBgColors] = useState({});

    // Set initial background colors when notes are available
    useEffect(() => {
        if (notes?.length > 0) {
            const initialColors = notes.reduce((acc, note) => {
                acc[note.id] = note.bg || "transparent"; 
                return acc;
            }, {});
            setNoteBgColors(initialColors);
        }
    }, [notes]);

    // Function to update background color for a specific note
    const updateNoteBg = (noteId, newColor) => {
        setNoteBgColors((prev) => ({
            ...prev,
            [noteId]: newColor,
        }));
    };

    let pinnedNotes, otherNotes;

    if (type !== "notes") {
        pinnedNotes = null;
        otherNotes = notes;
    } else {
        pinnedNotes = notes.filter((note) => note.isPinned);
        otherNotes = notes.filter((note) => !note.isPinned);
    }

    return (
        <>
            {notes && notes.length > 0 && (
                <div className={`${style.dataSection} ${viewStyle}`}>
                    {pinnedNotes?.length > 0 && (
                        <div className={`${style.pinned} `}>
                            <h3 className={style.title}>pinned</h3>
                            <div className={`${style.content}`}>
                                {pinnedNotes.map((note, index) => (
                                    <Note
                                        key={index}
                                        note={note}
                                        bgColor={noteBgColors[note.id]} 
                                        setBg={(color) => updateNoteBg(note.id, color)} 
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    <div className={`${style.others}`}>
                        {pinnedNotes?.length > 0 && otherNotes?.length > 0 && (
                            <h3 className={style.title}>others</h3>
                        )}
                        <div className={`${style.content}`}>
                            {otherNotes.map((note, index) => (
                                <Note
                                    key={index}
                                    note={note}
                                    bgColor={noteBgColors[note.id]} 
                                    setBg={(color) => updateNoteBg(note.id, color)} 
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
