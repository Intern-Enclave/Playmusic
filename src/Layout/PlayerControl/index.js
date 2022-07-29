import React, { useContext, useState } from "react";
import { trackContext } from "../../App";

import MediaItem from '../../component/MediaItem';
import Controls from '../../component/Controls';

// import { TbVolume } from 'react-icons/tb';
import { GiMicrophone } from 'react-icons/gi';
import { FaWindowRestore, FaMicrophoneAlt } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import { AiFillHeart, AiOutlineDownload, AiOutlineStop, AiOutlinePlusCircle,AiOutlineComment, AiOutlineLink, AiOutlineRight  } from 'react-icons/ai';
import { BsHeadphones } from 'react-icons/bs';
import {MdQueueMusic} from 'react-icons/md';
import { IoMdWifi } from 'react-icons/io';
// import {AiOutlineComment, AiOutlineLink, AiOutlineRight} from 'react-icons/ai';
import {BiShare,BiMessageSquareAdd} from 'react-icons/bi';
import {TbPlaylist,TbVolume} from 'react-icons/tb';

import './playerControl.scss'
import { useMusic } from "../../hooks/useMusic";
import Button from "../../component/Button/Button";
import UseApi from "../../API/UseApi";
import { Link } from "react-router-dom";

// import imgf from "/.img/flexincirkleK.jpg"

//import Toastmenu from "../../component/Toastmenu/Toast";
import MoreMenu from "../../component/MoreMenu/MoreMenu";


function PlayerControl() {

    const {currentSong, playlistUser, setPlaylist,setShowAddSong,showAddSong} = useMusic()
    const [Show, setShow] = useState(false)

    const [List, setList] = useState([]);
    let toastProperties = null;

    const handleShowToastMenu = (songName, playlistName) => {
        toastProperties = {
            id: 1,
            tittle: "Succes",
            description: `${songName} added to playlist ${playlistName}` ,
           
        }

        setList([toastProperties])
    }


    const addSong = async (id) => {
      try{ 
        const temp = {trackId: currentSong?.id, playlistId: id};
        const resp = await UseApi.postSong(temp);
        
        // setPlaylistUser([...playlistUser, resp])
      }catch (error) {
        console.log("error post add song: ", error);
      }
    }    

    const addSongtoplaylist = (id) => {
        setPlaylist(id);
        addSong(id);
    } 

    const handleShowMenuMore = () => {
        const modal = document.querySelector(".overlay");
        modal.classList.add("open");
    }

    const handleHideMenuMore = () => {
        const modal = document.querySelector(".overlay");
        modal.classList.remove("open");
    }

    const handleShowAddPlaylist = () => {
        const modal = document.querySelector(".choose-playlist-menu-container");
        modal.classList.add("open1");
        
    }

    const handleHideAddPlaylist = () => {
        const modal = document.querySelector(".choose-playlist-menu-container");
        modal.classList.remove("open1");
    }

    
    return (
        <div className='player-controls'>
            <div className='control-left'>
                <MediaItem 
                    // img='https://anhdep123.com/wp-content/uploads/2021/01/nhung-hinh-anh-hoang-hon-buon.jpg' 
                    img= {currentSong?.artist?.picture}                   
                    SongName={currentSong?.title}
                    singer = {currentSong?.artist?.name}
                />
                <div className="control-left-more" >
                    <span className="control-left-3point" onClick={()=>setShowAddSong(!showAddSong)}>
                        <FiMoreHorizontal />
                    </span>
                    
                    {showAddSong && <MoreMenu
                        nameSong ={currentSong?.title} 
                        imgSong= {currentSong.artist?.picture}
                        />
                    }
                </div>
            </div>
            <div className='control-center'><Controls/></div>
            <div className='control-right'>
                <span className='control-volume'>
                    <TbVolume />
                </span>
                <span className='control-micro'>
                    <GiMicrophone />
                </span>
                <span className='control-restore'>
                    {/* <span onClick={() => handleShowToastMenu()}><FaWindowRestore /></span> */}
                    <span><FaWindowRestore /></span>
                    
                </span>
            </div>


        {/* <Toastmenu toastlist={List} setList= {setList}/> */}


            
        </div>

    );
}

export default PlayerControl;