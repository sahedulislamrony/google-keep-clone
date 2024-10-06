import { createContext, useContext, useState } from "react";

let ViewContext = createContext();


// eslint-disable-next-line react-refresh/only-export-components
export function useView() {
    return useContext(ViewContext);
}

export function ViewProvider({children}) {
    let [isGridView, setGridView] = useState(false);
    let [minimize, setMinimize] = useState(false);

    const toggleView = () => {
        setGridView(prevState => !prevState);
    };
  
    let value ={
        isGridView,
        toggleView , 
        setMinimize ,
        minimize,
    };

    return (
        <ViewContext.Provider value={value}>
            {children}
        </ViewContext.Provider>
    );
}