import React, { useState, useEffect } from "react";
import MediaItem from "../../component/MediaItem";
import { TbPlayerPlay, TbPlayerPause } from "react-icons/tb";
import { AiTwotoneHeart,  AiOutlinePlus} from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import Button from "../../component/Button/Button";
import { useMusic } from "../../hooks/useMusic";
import UseApi from "../../API/UseApi";

import "./singerId.scss";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 



function SingerId() {
  const { setPlaylist, playlist_Id, currentSong, togglePlay, isPlay, handleChooseSong ,handlePlayAnotherSong,playlistUser, listTrack, singername, 
  imga, setShowAddSong, ShowAddSong} =
  useMusic();

  const [active, setActive] = useState("");
  const [listTrackId, setListTrackId] =useState([]);
  const [playlistName, setPlaylistName] = useState('')
  const [play, setPlay] = useState(false);
  const [showBtn, setShowBtn] = useState(false);


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

  
  return (
    <div className="singerid-container">
      <div className="singerid-content">
       <div className="singerid-header">
        <div className="singerid-header-content">
          <div className="singerid-header-desc">
            <div className="singerid-header-desc-info">
              <h1>{singername}</h1>
              <p>Samuel Frederick Smith born 19 May 1992 is an English singer and songwriter.</p>
            </div>
            <div className="singerid-header-desc-img">
              <img src = {imga}></img>
            </div>
          </div>
        </div>
       </div>
       <div className="singerid-music">
          
          <div className="singerid-music-content">

            <div className="singerid-music-cd">
              <img
                src ={imga}
                alt=""
                className={`playlist-music-img ${isPlay && play ? "play" : ""}`}
              />
              
            </div>
            <div className="singerid-music-info">
              <h2 className="singerid-music-info-name">{play ? currentSong?.title: `Title of music`}</h2>
             
             
              <h3 className="singerid-music-info-album">
                Album: {play ?currentSong?.album?.title : `Album of ${singername}` }
              </h3>
              <h3 className="singerid-music-info-time">
                Time: {play ? convertHMS(currentSong?.duration): "00.00"}
              </h3>

              <div className="singerid-music-control">
                {showBtn && <Button
                  onClick={togglePlay}
                  primary
                  leftIcon={isPlay ? <TbPlayerPause /> : <TbPlayerPlay />}
                >
                  {isPlay ? "Pause" : "Play"}
                </Button>}
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
              <div className="playlist-title-song">Tittle</div>
              <div className="playlist-title-album">Album</div>
              <div className="playlist-title-time from-singerid-time" >Time</div>
            </div>
          {listTrack ? (
            listTrack.map((val, index) => (
              (val.artist.name == singername)&&(
              <div
              className={`singerid-item  playlist-item ${currentSong?.id == val.id ? "active" : ""}`}
              key={val.id}
              onClick={() => {
                setActive(index);
                handleChooseSong(val, listTrack.filter((val) => val.artist.name === singername ));
                handlePlayAnotherSong()
                setPlay(true);
                setShowBtn(true);
              }}
              >
                <Tippy delay={[0, 200]} content="Add Playlist">
                  <button className="playlist-item-icon" onClick={()=>setShowAddSong(!ShowAddSong)}>
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
              </div>)
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
