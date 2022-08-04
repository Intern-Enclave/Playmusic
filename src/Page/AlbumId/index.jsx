import React, { useState, useEffect } from "react";
import MediaItem from "../../component/MediaItem";
import { ImMusic } from "react-icons/im";
import { TbPlayerPlay, TbPlayerPause } from "react-icons/tb";
import { AiTwotoneHeart, AiOutlinePlus } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
// import { PlayingMusicContext } from "../../Context/PlayingMusicContext";

import "./newsong.scss";
import Button from "../../component/Button/Button";
import { useMusic } from "../../hooks/useMusic";
import UseApi from "../../API/UseApi";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

function AlbumId() {
  const {
    listTrackInAlbum,
    setListTrackInAlbum,
    album,
    currentSong,
    togglePlay,
    isPlay,
    handleChooseSong,
    handlePlayAnotherSong,
  } = useMusic();
  const [active, setActive] = useState("");
  const [play, setPlay] = useState(false)


  function convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds; // Return is HH : MM : SS
  }

  return (
    <div className="playlist container">
      <div className="playlist-info">
        <div className="playlist-music">
          <div className="playlist-music-cd">
            {/* {console.log(currentSong?.artist.picture)} */}
            <img
              src={
                play ?
                currentSong.artist?.picture :
                listTrackInAlbum[0]?.artist.picture_medium
              }
              // src="https://api.deezer.com/artist/13/image"
              alt=""
              className={`playlist-music-img ${isPlay ? "play" : ""}`}
            />
          </div>
          <div className="playlist-music-info container">
            <h2 className="playlist-music-info-name">{currentSong?.title}</h2>
            {/* <h3 className="playlist-music-info-singer">
              Singer: {currentSong?.artist?.name}
            </h3>
            <h3 className="playlist-music-info-album">
              Album: {currentSong?.album?.title}
            </h3>
            <h3 className="playlist-music-info-time">
              Time: {convertHMS(currentSong?.duration)}
            </h3> */}
  
            <div className="playlist-music-control">
              <Button
                onClick={togglePlay}
                primary
                leftIcon={isPlay ? <TbPlayerPause /> : <TbPlayerPlay />}
              >
                {isPlay ? "Pause" : "Play"}
              </Button>
              {/* <Button onClick={pause.togglePlay()} primary leftIcon={pause?.isPlay ? <TbPlayerPause /> : <TbPlayerPlay />} >{pause?.isPlay ? 'Pause' : 'Play'}</Button> */}
              <div className="playlist-music-control-icons">
                <div className="playlist-music-control-icon">
                  <AiTwotoneHeart />
                </div>
                <div className="playlist-music-control-icon">
                  <BsThreeDots />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="playlist-title">
          <div className="playlist-title-song">Title</div>
          <div className="playlist-title-album">Album</div>
          <div className="playlist-title-time">Time</div>
        </div>
        <div className="playlist-content">
          {listTrackInAlbum ? (
            listTrackInAlbum.map((val, index) => (
              <div
                className={`playlist-item ${
                  currentSong?.id == val.id ? "active" : ""
                }`}
                key={val.id}
                onClick={() => {
                  setActive(index);
                  handleChooseSong(val, listTrackInAlbum);
                  handlePlayAnotherSong();
                }}
              >
                <Tippy delay={[0, 200]} content="Add Playlist">
                  <button className="playlist-item-icon">
                    <AiOutlinePlus />
                  </button>
                </Tippy>
    
                <MediaItem
                  singer={val.artist.name}
                  SongName={val.title}
                  img={val.artist.picture}
                />
                <div className="playlist-item-album">{val.album.title}</div>
                <div className="playlist-item-time">{convertHMS(val.duration)}</div>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AlbumId;
