import React, { useState, useEffect } from "react";
import MediaItem from "../../component/MediaItem";
import { TbPlayerPlay, TbPlayerPause } from "react-icons/tb";
import { AiTwotoneHeart, AiFillDelete } from "react-icons/ai";
import { BsThreeDots,BsFillPlusCircleFill } from "react-icons/bs";
import { BsDiscFill } from "react-icons/bs";
// import { PlayingMusicContext } from "../../Context/PlayingMusicContext";
import img from './img/istockphoto-1144987755-170667a.jpg'

import Button from "../../component/Button/Button";
import { useMusic } from "../../hooks/useMusic";
import UseApi from "../../API/UseApi";

import "./singer.scss";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 



function Singer() {
  const {  listTrack ,setPlaylist, playlist_Id, currentSong, togglePlay, isPlay, handleChooseSong ,handlePlayAnotherSong,playlistUser} =
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

  return (
    <div className="singer-container">
      <div className="singer-content1">
        <div className="singer-content-img">
          <img src={img}></img> 
            <div className="singer-content-in-img">
              <h2>Singers</h2>
              <h3>They sing! You nghe olala</h3>
          </div>
        </div>
        <div className="singer-like-part">
          <div className="singer-like-header">
            <h3>You May Be Like</h3>
          </div>
          <div className="singer-like-content">
              {listTrack ? (
                listTrack.slice(0,5).map((val, index) => (
                  <div className="singer-like-item"
                        Key = {val.id}      
                  >
                      <div className="singer-like-img">
                        <img src = {val.artist.picture}></img>
                        <span><BsDiscFill/></span>
                      </div>
                      <div className="singer-like-desc">
                        <p>{val.artist.name} </p>
                      </div>
                    </div>
                ))
            ) : (
            <div></div>
          )}
          </div>
        </div>
        <div className="orther-singer-part">
        <div className="orther-singer-header">
            <h3>Other Singers</h3>
          </div>
          <div className="orther-singer-content">
            {listTrack ? (
                  listTrack.map((val, index) => (
                    <div className="orther-singer-item">
                      <div className="orther-singer-img"
                            Key = {val.id}
                      >
                        <img src = {val.artist.picture}></img>
                        <span><BsDiscFill/></span>
                      </div>
                      <div className="orther-singer-desc">
                        <p>{val.artist.name}</p>
                      </div>
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

export default Singer;
