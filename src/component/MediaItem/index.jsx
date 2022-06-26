import React from 'react';
import PropTypes from 'prop-types';
import './mediaItem.scss'

function MediaItem({singer, SongName, img, className,...props}) {
    return (
// src https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/1/b/8/9/1b8958017b04a663eb8c093905dd4d85.jpg
        <div className = {`mediaItem ${className}`}>
            <img className='mediaItem-img' src={img} alt='' />
            <div className="mediaItem-info">
                <h4 className="mediaItem-info-name">
                    <marquee>{SongName}</marquee>
                </h4>
                <span className="mediaItem-info-singer">{singer}</span>
            </div>
        </div>
            
        
    );
}

MediaItem.propTypes = {
    singer: PropTypes.string.isRequired,
    SongName: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    className: PropTypes.string,
};
export default MediaItem;