import React, { useState, useEffect } from "react";
import MediaItem from "../../component/MediaItem";
import { TbPlayerPlay, TbPlayerPause } from "react-icons/tb";
import { AiTwotoneHeart, AiFillDelete,AiOutlineClose } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
// import { PlayingMusicContext } from "../../Context/PlayingMusicContext";

import "./playlist.scss";
import Button from "../../component/Button/Button";
import { useMusic } from "../../hooks/useMusic";
import UseApi from "../../API/UseApi";

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 



function PlaylistId() {
  const { setPlaylist, playlist_Id, currentSong, togglePlay, isPlay, handleChooseSong ,handlePlayAnotherSong,
    playlistUser,setIsFetchingData, isFetchingData,listTrackId, currentUser} =
  useMusic();

  const [playlistName, setPlaylistName] = useState(null);
  const [newPlaylistName, setNewPlaylistName] = useState(null);
  const [formRequest, setFormRequest] = useState(false);
  const [play, setPlay] = useState(false);
  
  useEffect(() => {
    playlistUser.map((val)=> {
      if(val.id==playlist_Id) {
        setPlaylistName(val.name)
      }
    })
  }, [playlistUser]);

  const delSong = async (i) => {
    setIsFetchingData(true);
    try{ 
      const resp = await UseApi.deleteSong({trackId:i, playlistId: playlist_Id})
      console.log(resp)
      const newPlaylistId = listTrackId.filter((playlist) => {
        return playlist.id !== i;
      })
      // setListTrackId(newPlaylistId) 
    }catch (error) {
      console.log("error post playlist: ", error);
    }finally{
      setIsFetchingData(false);
    }
  }

  const editPlaylistName = async () => {
    setIsFetchingData(true)
    try{
        const temp = {
          name: playlistName,
          rename: newPlaylistName,
          username:currentUser?.username,
        }
        const resp = await UseApi.updatePlaylistName(temp)
        // console.log(temp)
    }catch(error){
        console.log("error edit playlist name ", error);
    }finally{
      setIsFetchingData(false)
    }
  }

  const onsubmit = () => {
    setFormRequest(false);
    editPlaylistName();
  };



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
    {formRequest && (
      <div className="modal">
          <div className="modal__overlay"></div>

          <div className="modal__body">
            <form action="" className="register" id="form-register">
              <div className="create-playlist-modal">
                <div className="create-playlist-container">
                  <div className="create-playlist-content">
                    <div className="create-playlist-from-content">
                      <span to={"/playlist"} className="close-button">
                        <AiOutlineClose onClick={() => setFormRequest(false)} />
                      </span>
                      <div className="create-playlist-header">
                        <h3 className="create-playlist-tittle">
                          Edit playlist name
                        </h3>
                      </div>
                      <input
                        className="create-playlist-name-input"
                        placeholder="Type your playlist name"
                        onChange={(e) => setNewPlaylistName(e.target.value)}
                      ></input>
                      <div className="create-button save" onClick={onsubmit}>
                        <span>Save</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>)}


      <div className="playlist-music">

         <div className="playlist-music-cd">
          <img
            src={play ? currentSong.artist?.picture : listTrackId[0]?.artist?.picture}
            // src="https://api.deezer.com/artist/13/image"
            alt=""
            className={`playlist_id-music-img ${isPlay&&play ? "play" : ""}`}
          />
          {playlistName && (<div className="playlist_id-cd-title">
            <div className="playlist_id-cd-title-name">
                {playlistName}
            </div>
            <span className="playlist_id-cd-title-icon" onClick={() => setFormRequest(true)}>
              <FiEdit />
            </span>
          </div>)}
        </div>
        <div className="playlist-music-info">
          <h2 className="playlist-music-info-name">{play ? currentSong?.title : listTrackId[0]?.title}</h2>
          <h3 className="playlist-music-info-singer">
            Singer: {play ? currentSong?.artist?.name : listTrackId[0]?.artist?.name}
          </h3>
          <h3 className="playlist-music-info-album">
            Album: {play ? currentSong?.album?.title : listTrackId[0]?.album?.title}
          </h3>
          <h3 className="playlist-music-info-time">
            Time: {play ? convertHMS(currentSong?.duration) : convertHMS(listTrackId[0]?.duration)}
          </h3>

          <div className="playlist-music-control">
            <Button
              onClick={()=>{
                togglePlay();
                setPlay(!play);
                handleChooseSong(listTrackId[0],listTrackId)
              }}
              primary
              leftIcon={isPlay&&play ? <TbPlayerPause /> : <TbPlayerPlay />}
            >
              {isPlay&&play ? "Pause" : "Play"}
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
        listTrackId?.map((val, index) => (
          <div   
            className={`playlist-item-wraper ${(currentSong?.id == val.id) ? "active" : ""}`}  
            key={val.id}
          >
              <Tippy delay={[0,200]} content='delete'>
                <button className="playlist-item-icon" onClick={() => delSong(val.id)}>
                  <AiFillDelete />
                </button>
              </Tippy>
            <div 
              onClick={() => {
                handleChooseSong(val, listTrackId);
                handlePlayAnotherSong();
                setPlay(true);
              }}
              className={`playlist-item` }
            >
  
              <MediaItem
                singer={val.artist.name}
                SongName={val.title}
                img={val.artist.picture}
              />
              <div className="playlist-item-album">{val.album.title}</div>
              <div className="playlist-item-time">{convertHMS(val.duration)}</div>
            </div>
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default PlaylistId;
