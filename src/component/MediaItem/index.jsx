import React from 'react';
import PropTypes from 'prop-types';
import './mediaItem.scss'

function MediaItem() {
    return (

        <div className='mediaItem'>
            <img className='mediaItem-img' src='https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/1/b/8/9/1b8958017b04a663eb8c093905dd4d85.jpg' alt='' />
            <div className="mediaItem-info">
                <h4 className="mediaItem-info-name">
                    <marquee >Vì mẹ anh bắt chia tayyyyyyyyyyyyy</marquee>
                </h4>
                <span className="mediaItem-info-singer">Miu lee</span>
            </div>
        </div>
            
        
    );
}

MediaItem.propTypes = {
    
};
export default MediaItem;