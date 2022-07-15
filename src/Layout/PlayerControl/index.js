import React, { useContext } from "react";
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


function PlayerControl() {

    const {currentSong, playlistUser, setPlaylist} = useMusic()

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
                    <span className="control-left-3point" onClick={handleShowMenuMore}>
                        <FiMoreHorizontal />
                    </span>
                    <div className="overlay"  onClick={handleHideMenuMore}>
                    <div className="control-left-more-menu" onClick={(e) => e.stopPropagation()}>
                        <div className="more-menu">
                            <div className="more-menu-song-info">
                                <img src={currentSong?.artist?.picture}></img>
                                <div className="song-tittle">
                                    <p>{currentSong?.title}</p>
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
                            <div className="menu-options">
                                <div className="menu-optin-one addd-topl-pos" 
                                    onMouseEnter = {handleShowAddPlaylist} 
                                    onMouseLeave = {handleHideAddPlaylist}
                                    >
                                    <div className="menu-option-icon">
                                        <span><AiOutlinePlusCircle/></span>
                                    </div>
                                    <p> Add music to playlist</p>
                                    <span style={{marginLeft:40}}>
                                        <AiOutlineRight/>
                                    </span>
                                    <div className="choose-playlist-menu-container ">
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
                                                        <Link to={'/playlist/playlist_id'} className="playlist-add-item " key={val.id} onClick={() => addSongtoplaylist(val.id)}>
                                                            <span><TbPlaylist/></span>
                                                            <p>{val.name}</p>
                                                        </Link>
                                                    ))}
                                                </div>
            
                                            </div>
                                        </div>
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
                    </div>
                    </div>
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
                    <FaWindowRestore />
                </span>
            </div>
        </div>

    );
}

export default PlayerControl;