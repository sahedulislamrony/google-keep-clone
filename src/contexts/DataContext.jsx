import { createContext, useContext, useState } from "react";

const DataContext = createContext();


// eslint-disable-next-line react-refresh/only-export-components
export function useData() {
    return useContext(DataContext);
}

export function DataProvider({ children }) {
    const [triggerReload, setTriggerReload] = useState(false);
    const [reset , setReset] = useState(false);

    const value = {
        triggerReload,
        setTriggerReload,
        reset,
        setReset,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}
