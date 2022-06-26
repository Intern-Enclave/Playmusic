import React, { useState, useEffect } from "react";
import axios from 'axios';

import MediaItem from '../../component/MediaItem';
import Controls from '../../component/Controls';

import { TbVolume } from 'react-icons/tb';
import { GiMicrophone } from 'react-icons/gi';
import { FaWindowRestore } from 'react-icons/fa';

import './playerControl.scss'

function PlayerControl() {

    const [data, setData] = useState([]); 
    const [audioIndex, setAudioIndex] = useState(0);

    const getData = () => {
        axios
          .get("http://localhost:3000/data")
          .then(function (response) {
            setData(response.data);
          })
          .catch(function (error) {
            console.log(error);
          })
      };
      
      useEffect(() => {
        getData()
      }, [] )

    return (
        <div className='player-controls'>
            <div className='control-left'>
                <MediaItem 
                    img='https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/1/b/8/9/1b8958017b04a663eb8c093905dd4d85.jpg' 
                    SongName='data.title'
                    singer = 'acbd'
                />
            </div>
            <div className='control-center'><Controls /></div>
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