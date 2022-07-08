import React, { useContext } from "react";
import { trackContext } from "../../App";

import MediaItem from '../../component/MediaItem';
import Controls from '../../component/Controls';

import { TbVolume } from 'react-icons/tb';
import { GiMicrophone } from 'react-icons/gi';
import { FaWindowRestore, FaMicrophoneAlt } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import { AiOutlineHeart ,AiFillHeart, AiOutlineDownload, AiOutlineStop, AiOutlinePlusCircle  } from 'react-icons/ai';
import { BsHeadphones } from 'react-icons/bs';
import {MdQueueMusic} from 'react-icons/md';
import { IoMdWifi } from 'react-icons/io';
import {AiOutlineComment, AiOutlineLink} from 'react-icons/ai';
import {BiShare} from 'react-icons/bi';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './playerControl.scss'
import { useMusic } from "../../hooks/useMusic";
// import imgf from "/.img/flexincirkleK.jpg"



function PlayerControl() {

    const {currentSong} = useMusic()
    
    const handleShowMenuMore = () => {
        const modal = document.querySelector(".overlay");
        modal.classList.add("open");
    }

    const handleHideMenuMore = () => {
        const modal = document.querySelector(".overlay");
        modal.classList.remove("open");

        const moremenu = document.querySelector(".control-left-more-menu");
        moremenu.addEventListener("click", function (e) {
            e.stopPropagation();
        })
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
                <div className="control-left-add">
                    <Tippy delay={[0,200]} content='Add to playlist'>
                        <span className="control-left-addToPl">
                            <AiOutlineHeart />
                        </span>        
                    </Tippy>
                </div>
               
                <div className="control-left-more" >
                    <span className="control-left-3point" onClick={handleShowMenuMore}>
                        <FiMoreHorizontal />
                    </span>
                    <div className="overlay"  onClick={handleHideMenuMore}>
                    <div className="control-left-more-menu">
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
                                <div className="menu-optin-one">
                                    <div className="menu-option-icon">
                                        <span><AiOutlinePlusCircle/></span>
                                    </div>
                                    <p> Add music to playlist</p>
                                </div>
                                <div className="menu-optin-one">
                                    <div className="menu-option-icon">
                                        <span><IoMdWifi/></span>
                                    </div>
                                    <p> Play radio of music</p>
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