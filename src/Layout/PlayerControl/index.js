import React, { useContext } from "react";
import { trackContext } from "../../App";

import MediaItem from '../../component/MediaItem';
import Controls from '../../component/Controls';

import { TbVolume } from 'react-icons/tb';
import { GiMicrophone } from 'react-icons/gi';
import { FaWindowRestore } from 'react-icons/fa';

import './playerControl.scss'



function PlayerControl() {

    const tracks = useContext(trackContext)
    // console.log(tracks)

    return (
        <div className='player-controls'>
            <div className='control-left'>
                <MediaItem 
                    // img='https://anhdep123.com/wp-content/uploads/2021/01/nhung-hinh-anh-hoang-hon-buon.jpg' 
                    img= {tracks[0]?.artist.picture}                   
                    SongName={tracks[0]?.title}
                    singer = {tracks[0]?.artist.name}
                />
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