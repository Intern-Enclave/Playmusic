import React from "react";

import MediaItem from '../../component/MediaItem';
import Controls from '../../component/Controls';

import { GiMicrophone } from 'react-icons/gi';
import { FaWindowRestore } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import {TbVolume} from 'react-icons/tb';

import './playerControl.scss'
import { useMusic } from "../../hooks/useMusic";
import Comment from "../../component/Comment";

// import imgf from "/.img/flexincirkleK.jpg"

//import Toastmenu from "../../component/Toastmenu/Toast";
import MoreMenu from "../../component/MoreMenu/MoreMenu";


function PlayerControl() {

    const {currentSong,setShowAddSong,showAddSong, ShowComment,} = useMusic()


    // const addSong = async (id) => {
    //   try{ 
    //     const temp = {trackId: currentSong?.id, playlistId: id};
    //     const resp = await UseApi.postSong(temp);
        
    //     // setPlaylistUser([...playlistUser, resp])
    //   }catch (error) {
    //     console.log("error post add song: ", error);
    //   }
    // }    
    
    return (
        <div className='player-controls'>
            {ShowComment && 
                <Comment
                    onClick={(e)=>{e.stopPropagation()}}
                />} 
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