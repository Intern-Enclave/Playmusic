import React from 'react';

function Songitem() {
    return (
        <div className='songitem'>
            <div className="songitem-img">
                <img
                    // src={currentSong.artist?.picture}
                    src="https://api.deezer.com/artist/13/image"
                    alt=""
                    // className={`playlist-music-img ${isPlay ? "play" : ""}`}
                />
            </div>
            <div className="songitem-title">
                <div className="songitem-title-name"></div>
                <div className="songitem-title-singer"></div>
            </div>
        </div>
    );
}

export default Songitem;