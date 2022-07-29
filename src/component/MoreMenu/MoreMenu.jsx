import React, {useState} from 'react';
import { useMusic } from "../../hooks/useMusic";
import UseApi from "../../API/UseApi";
import { Link } from "react-router-dom";
import Toastmenu from "../Toast"

import "./MoreMenu.scss"

import { GiMicrophone } from 'react-icons/gi';
import { FaWindowRestore, FaMicrophoneAlt } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import { AiFillHeart, AiOutlineDownload, AiOutlineStop, AiOutlinePlusCircle,AiOutlineComment, AiOutlineLink, AiOutlineRight  } from 'react-icons/ai';
import { BsHeadphones } from 'react-icons/bs';
import {MdQueueMusic} from 'react-icons/md';
import { IoMdWifi } from 'react-icons/io';
import {BiShare,BiMessageSquareAdd} from 'react-icons/bi';
import {TbPlaylist,TbVolume} from 'react-icons/tb';

const MoreMenu = ({nameSong, imgSong}) => {

    const {currentSong, playlistUser, setPlaylist,setShowAddSong,showAddSong} = useMusic()

    const [List, setList] = useState([]);
    let toastProperties = null;

    const handleShowToastMenu = (type, songName, playlistName) => {
        switch(type) {
          case 'success':
            toastProperties = {
              id: List.length + 1,
              tittle: "Success",
              description: `${songName} added to playlist ${playlistName}` ,
              color: "#7200a1"
          }
          break;
  
          case 'error':
            toastProperties = {
              id: List.length + 1,
              tittle: "Error",
              description: `Cannot add to ${playlistName}`,
              color: "#7200a1"
          }
          break;
  
          default:
            toastProperties = [];
        }
        setList([...List ,toastProperties])
          // toastProperties = {
          //     id: 1,
          //     tittle: "Success",
          //     description: "Saved Information",
          //     color: "#7200a1"
          // }
  
          // setList([toastProperties])
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
        const modal = document.querySelector(".overlay1");
        modal.classList.add("close")
    }

    const handleShowAddPlaylist = () => {
        const modal = document.querySelector(".choose-playlist-menu-container");
        modal.classList.add("open1");
        
    }

    const handleHideAddPlaylist = () => {
        const modal = document.querySelector(".choose-playlist-menu-container");
        modal.classList.remove("open1");
    }

    // const [Show, setShow] = useState(true);
    return (
        // onClick={handleHideMenuMore}
        // onClick={(e) => setShow(!Show)}
        <div className='conatiner-add'>
            <Toastmenu toastlist={List} setList= {setList}/>
                
            <div className="overlay1" onClick={()=>{setShowAddSong(false)}} >
                    <div className="control-left-more-menu " onClick={(e)=>{e.stopPropagation()}}>
                        <div className="more-menu pos-add-menu">
                            <div className="more-menu-song-info">
                                <img src={imgSong}></img>
                                <div className="song-tittle">
                                    <p>{nameSong}</p>
                                </div>
                                <div className="song-status">
                                    <div> 
                                        <span><BsHeadphones />100</span>
                                    </div>
                                    <div> 
                                        <span><AiFillHeart />10.k</span>
                                    </div>
                                </div>
                            </div>
                            <div className="menu-button-list">
                                <div className="bt-list-one">
                                    <span><AiOutlineDownload/></span>
                                    <p>Download</p>
                                </div>
                                <div className="bt-list-one">
                                    <span><MdQueueMusic/></span>
                                    <p>Lyrics</p>
                                </div>
                                <div className="bt-list-one">
                                    <span><AiOutlineStop/></span>
                                    <p>Nope</p>
                                </div>
                            </div>
                            <div className="menu-options ">
                                <div className="menu-optin-one " 
                                    onMouseEnter = {handleShowAddPlaylist} 
                                    // onMouseLeave = {handleHideAddPlaylist}
                                    >
                                    <div className="menu-option-icon">
                                        <span><AiOutlinePlusCircle/></span>
                                    </div>
                                    <p> Add music to playlist</p>
                                    <span style={{marginLeft:40}}>
                                        <AiOutlineRight/>
                                    </span>
                                    
                                </div>
                                

                                <div className="menu-optin-one">
                                    <div className="menu-option-icon">
                                        <span><IoMdWifi/></span>
                                    </div>
                                    <p> Play radio of music</p>
                                    {/* <Button transparent leftIcon={<IoMdWifi/>} className="menu-option-icon">Play radio of music </Button> */}
                                </div>
                                <div className="menu-optin-one">
                                    <div className="menu-option-icon">
                                        <span><FaMicrophoneAlt/></span>
                                    </div>
                                    <p> Play with music lyrics</p>
                                </div>
                                <div className="menu-optin-one">
                                    <div className="menu-option-icon">
                                        <span><AiOutlineComment/></span>
                                    </div>
                                    <p>Comments</p>
                                </div>
                                <div className="menu-optin-one">
                                    <div className="menu-option-icon">
                                        <span><AiOutlineLink/></span>
                                    </div>
                                    <p> Copy link</p>
                                </div>
                                <div className="menu-optin-one">
                                    <div className="menu-option-icon">
                                        <span><BiShare/></span>
                                    </div>
                                    <p> Share</p>
                                </div>
                                
                            </div>
                        </div>
                        <div className="choose-playlist-menu-container " 
                                        onMouseEnter={handleShowAddPlaylist}
                                        onMouseLeave = {handleHideAddPlaylist}
                                    >
                                        <div className="choose-playlist-menu-content">
                                            <div className="choose-menu-header">
                                                <div className="search-playlist-add">
                                                    <input placeholder="Search playlist"/>
                                                </div>
                                                <div className="create-playlist-add ">
                                                    <span><BiMessageSquareAdd/></span>
                                                    <p>Create new playlist</p>
                                                </div>
                                            </div>
                                            <div className="all-pl-add">
                                                {playlistUser && playlistUser.map(val => (
                                                    <Link to={'/playlist/playlist_id'} 
                                                        className="playlist-add-item " key={val.id} 
                                                        onClick={() => {addSongtoplaylist(val.id); handleShowToastMenu('success',currentSong?.title, val.name)}}
                                                    >
                                                    <span><TbPlaylist/></span>
                                                    <p>{val.name}</p>
                                                    </Link>
                                                ))}
                                            </div> 
                                    
                                        </div>
                                    </div>
                    </div>
                </div>
           </div>
        
    );
};

export default MoreMenu;