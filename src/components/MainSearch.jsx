import { useEffect, useRef } from "react";

export default function MainSearch({className,focus,goToSearch}) {

    const inputRef = useRef(null);

    useEffect(() => { 
        if(focus){
            inputRef.current.focus();

        }
    }, [focus]);
  
    return (
        <div className={className}>
            <input ref={inputRef} type="text" placeholder="Search" onClick={goToSearch} />
        </div>
    );
}