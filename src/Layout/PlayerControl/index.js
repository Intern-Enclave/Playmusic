import React from 'react';
import MediaItem from '../../component/MediaItem';
import Controls from '../../component/Controls';

import { TbVolume } from 'react-icons/tb';
import { GiMicrophone } from 'react-icons/gi';
import { FaWindowRestore } from 'react-icons/fa';

import './playerControl.scss'

function PlayerControl() {
    return (
        <div className='player-controls'>
            <MediaItem />
            <Controls />
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