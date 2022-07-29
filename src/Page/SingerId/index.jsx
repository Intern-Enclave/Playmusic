import React, { useState, useEffect } from "react";
import MediaItem from "../../component/MediaItem";
import { TbPlayerPlay, TbPlayerPause } from "react-icons/tb";
import { AiTwotoneHeart, AiFillDelete } from "react-icons/ai";
import { BsThreeDots,BsFillPlusCircleFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
// import { PlayingMusicContext } from "../../Context/PlayingMusicContext";
import img from './img/images-motthegioi-vn-8443_c2ftlxntaxroltetotuzos0xntg3mta3mji0.jpg'

import Button from "../../component/Button/Button";
import { useMusic } from "../../hooks/useMusic";
import UseApi from "../../API/UseApi";

import "./singerId.scss";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 



function SingerId() {
  const { setPlaylist, playlist_Id, currentSong, togglePlay, isPlay, handleChooseSong ,handlePlayAnotherSong,playlistUser} =
  useMusic();

  const [active, setActive] = useState("");
  const [listTrackId, setListTrackId] =useState([]);
  const [playlistName, setPlaylistName] = useState('')

  
  // console.log(playlistName)


  // console.log(localStorage.getItem('playlistId'))
  const getPlaylistId = async () => {
    try {
      setPlaylist(localStorage.getItem('playlistId'));
      const params = {playlistId: playlist_Id }
      const response = await UseApi.getTracksId({params});
      response ? setListTrackId(response) : setListTrackId([]);

      playlistUser.map((val)=> {
        if(val.id===playlist_Id) setPlaylistName(val.name)
      })
    } catch (error) {
      console.log("error get playlistId: ", error);
    }
  };
  
  useEffect(() => {
    getPlaylistId();
  }, [playlist_Id]);


  const delSong = async (i) => {
    try{ 
      const resp = await UseApi.deleteSong({trackId:i, playlistId: playlist_Id})
      console.log(resp)
      const newPlaylistId = listTrackId.filter((playlist) => {
        return playlist.id !== i;
      })
      setListTrackId(newPlaylistId)
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

  const [List, setList] = useState([]);
  let toastProperties = null;

  const handleShowToastMenu = (type, songName, playlistName) => {
    switch(type) {
      case 'success':
        toastProperties = {
          id: List.length + 1,
          tittle: "Success",
          description: `${songName} is deleted from playlist ${playlistName}`,
          color: "#7200a1"
      }
      break;

      case 'pass-success':
        toastProperties = {
          id: List.length + 1,
          tittle: "Success",
          description: "Change password complete",
          color: "#7200a1"
      }
      break;

      default:
        toastProperties = [];
    }
    setList([...List ,toastProperties])
      // toastProperties = {
      //     id: 1,
      //     tittle: "Success",
      //     description: "Saved Information",
      //     color: "#7200a1"
      // }

      // setList([toastProperties])
  }

  return (
    <div className="singerid-container">
      <div className="singerid-content">
       <div className="singerid-header">
        <div className="singerid-header-content">
          <div className="singerid-header-desc">
            <div className="singerid-header-desc-info">
              <h1>Sam Simth</h1>
              <p>Samuel Frederick Smith born 19 May 1992 is an English singer and songwriter.</p>
            </div>
            <div className="singerid-header-desc-img">
              <img src = {img}></img>
            </div>
          </div>
        </div>
       </div>
       <div className="singerid-music">
          
          <div className="singerid-music-content">

            <div className="singerid-music-cd">
              <img
                src={currentSong.artist?.picture}
                // src="https://api.deezer.com/artist/13/image"
                alt=""
                className={`singerid_id-music-img ${isPlay ? "play" : ""}`}
              />
              {/* <div className="singerid_id-cd-title">
                <div className="singerid_id-cd-title-name">
                    {playlistName}
                </div>
                <span className="singerid_id-cd-title-icon">
                  <FiEdit />
                </span>
              </div> */}
            </div>
            <div className="singerid-music-info">
              <h2 className="singerid-music-info-name">{currentSong?.title}</h2>
              {/* <h3 className="singerid-music-info-singer">
              currentSong?.artist?.name
                Singer: {'1111111111111111111'}
              </h3> */}
             
              <h3 className="singerid-music-info-album">
                Album: {currentSong?.album?.title}
              </h3>
              <h3 className="singerid-music-info-time">
                Time: {convertHMS(currentSong?.duration)}
              </h3>

              <div className="singerid-music-control">
                <Button
                  onClick={togglePlay}
                  primary
                  leftIcon={isPlay ? <TbPlayerPause /> : <TbPlayerPlay />}
                >
                  {isPlay ? "Pause" : "Play"}
                </Button>
                {/* <Button onClick={pause.togglePlay()} primary leftIcon={pause?.isPlay ? <TbPlayerPause /> : <TbPlayerPlay />} >{pause?.isPlay ? 'Pause' : 'Play'}</Button> */}
                <div className="singerid-more-btn">
                  <div className="singerid-music-control-icon">
                    <AiTwotoneHeart />
                  </div>
                  <div className="singerid-music-control-icon">
                    <BsThreeDots />
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          <div className="singerid-music-box">
            <div className="playlist-title ">
              <div className="playlist-title-song">The Song</div>
              <div className="playlist-title-album">Album</div>
              <div className="playlist-title-time from-singerid-time" >Time</div>
            </div>
          {listTrackId ? (
            listTrackId.map((val, index) => (
              <div
              className={`singerid-item ${currentSong?.id == val.id ? "active" : ""}`}
              key={val.id}
              onClick={() => {
                setActive(index);
                handleChooseSong(val, listTrackId);
                handlePlayAnotherSong()
              }}
              >
                {/* <Tippy delay={[0,200]} content='delete'>
                  <button className="playlist-item-icon" onClick={() => {delSong(val.id);handleShowToastMenu('success',val.title,playlistName)}}>
                    <AiFillDelete />
                  </button>
                </Tippy> */}

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
    </div>
  );
}

export default SingerId;
