import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import { useAuth } from "./../contexts/AuthContext";
import SearchLargeScreen from "./SearchLargeScreen";
import SearchSmallScreen from "./SearchSmallScreen";

export default function SearchView() {
    let { setReset } = useData();
    const {currentUser } = useAuth();
    const [close , setClose] = useState(true);

    let navigate = useNavigate();
    let goToSearch = () => {
        if(currentUser) {

            navigate("/search");
        }
        setClose(false);
    };
    let goToHome = () => {
        if(currentUser) {
            navigate("/");
        }
        setClose(true);
    };

    let reset = () => {
        setReset(true);
    };

    return (
        <>
            <SearchLargeScreen goToSearch={goToSearch} goToHome={goToHome} reset={reset} close={close}/>
            <SearchSmallScreen goToSearch={goToSearch} goToHome={goToHome} reset={reset} />

        </>
    );

}