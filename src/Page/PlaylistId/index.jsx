import React, { useState, useEffect } from "react";
import MediaItem from "../../component/MediaItem";
import { TbPlayerPlay, TbPlayerPause } from "react-icons/tb";
import { AiTwotoneHeart, AiFillDelete } from "react-icons/ai";
import { BsThreeDots,BsFillPlusCircleFill } from "react-icons/bs";
// import { PlayingMusicContext } from "../../Context/PlayingMusicContext";

import "./playlist.scss";
import Button from "../../component/Button/Button";
import { useMusic } from "../../hooks/useMusic";
import UseApi from "../../API/UseApi";

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 



function PlaylistId() {
  const { setPlaylist, playlist_Id, listTrack, currentSong, togglePlay, isPlay, handleChooseSong ,handlePlayAnotherSong} =
  useMusic();


  const [active, setActive] = useState("");
  const [listTrackId, setListTrackId] =useState([]);



  // console.log(localStorage.getItem('playlistId'))
  const getPlaylistId = async () => {
    try {
      setPlaylist(localStorage.getItem('playlistId'));
      const params = {playlistId: playlist_Id }
      const response = await UseApi.getTracksId({params});
      response ? setListTrackId(response) : setListTrackId([]);
    } catch (error) {
      console.log("error get playlistId: ", error);
    }
  };
  
  useEffect(() => {
    getPlaylistId();
  }, [playlist_Id]);


  const delSong = async (i) => {
    try{ 
      const resp = await UseApi.deletePlaylist({trackId:i, playlistId: playlist_Id})
      console.log(resp)
    }catch (error) {
      console.log("error post playlist: ", error);
    }
  }






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
      <div className="playlist-music">

        <div className="playlist-music-cd">
          <img
            src={currentSong.artist?.picture}
            // src="https://api.deezer.com/artist/13/image"
            alt=""
            className={`playlist-music-img ${isPlay ? "play" : ""}`}
          />
        </div>
        <div className="playlist-music-info">
          <h2 className="playlist-music-info-name">{currentSong?.title}</h2>
          <h3 className="playlist-music-info-singer">
            Singer: {currentSong?.artist?.name}
          </h3>
          <h3 className="playlist-music-info-album">
            Album: {currentSong?.album?.title}
          </h3>
          <h3 className="playlist-music-info-time">
            Time: {convertHMS(currentSong?.duration)}
          </h3>

          <div className="playlist-music-control">
            <Button
              onClick={togglePlay}
              primary
              leftIcon={isPlay ? <TbPlayerPause /> : <TbPlayerPlay />}
            >
              {isPlay ? "Pause" : "Play"}
            </Button>
            {/* <Button onClick={pause.togglePlay()} primary leftIcon={pause?.isPlay ? <TbPlayerPause /> : <TbPlayerPlay />} >{pause?.isPlay ? 'Pause' : 'Play'}</Button> */}
            <div className="playlist-music-control-icon">
              <AiTwotoneHeart />
            </div>
            <div className="playlist-music-control-icon">
              <BsThreeDots />
            </div>
          </div>
        </div>
      </div>
      <div className="playlist-title">
        <div className="playlist-title-song">The Song</div>
        <div className="playlist-title-album">Album</div>
        <div className="playlist-title-time">Time</div>
      </div>
      {listTrackId ? (
        listTrackId.map((val, index) => (
          <div
          className={`playlist-item ${index === active || currentSong?.id == val.id ? "active" : ""}`}
          key={val.id}
          onClick={() => {
            setActive(index);
            handleChooseSong(val);
            handlePlayAnotherSong()
          }}
          >
            <Tippy delay={[0,200]} content='delete'>
              <button className="playlist-item-icon" onClick={() => delSong(val.id)}>
                <AiFillDelete />
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
  );
}

export default PlaylistId;
