import Icon from "./Icon";
import ProfileMenu from "./ProfileMenu";
import SettingsMenu from "./SettingsMenu";

import { useState } from "react";
import { useView } from "../contexts/ViewContext";

import { useData } from "../contexts/DataContext";
import style from "../styles/Profile.module.scss";

export default function Profile({user}) {
    let {setTriggerReload} = useData();
    // settings menu
    let [showSettings, setShowSettings] = useState(false);
    let [showProfileInfo, setShowProfileInfo] = useState(false);
    let [grid , setGrid] = useState(false);
    let [hide, setHide] = useState(false);
     
    // eslint-disable-next-line no-unused-vars
    let { displayName, photoURL } = user;


    const { toggleView } = useView();

    let handleSetting = () => { 
        setHide(false);
        setShowSettings(prev => !prev);
        setShowProfileInfo(false);
    };
    let handleProfileInfo = () => {
        setHide(false);
        setShowProfileInfo(prev => !prev);
        setShowSettings(false);
    };

    let handleChange = () => {
        setHide(true);
        toggleView();
        setGrid(prevState => !prevState);
    };

    let refresh = () => {
        setHide(true);
        setTriggerReload(prev => !prev);
    };

  

    return (
        <>

       
            <div className={style.icons}>
    
                {/* <Icon name="cloud_done" className={style.icon} /> */}
                <Icon name="refresh" className={style.icon} onClick={refresh} />

                { grid && <Icon name="grid_view" className={style.icon}  onClick={handleChange} />}

                { !grid && <Icon name="view_agenda" className={style.icon} onClick={handleChange} />}

                <Icon name="settings" className={style.icon} onClick={handleSetting} />

                {!hide && showSettings && <SettingsMenu />}
            </div>

            <div className={style.profile}  >
                <Icon name="apps" className={style.icon} onClick={()=> setHide(true)} />
                <div className={style.img} onClick={handleProfileInfo} >
                    <img src={photoURL} alt="Profile" />        
                </div>
                {!hide && showProfileInfo && <ProfileMenu  user={user}  />}
            </div>
        </>
       
    );

}