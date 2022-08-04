import React, { useState, useEffect } from "react";
import MediaItem from "../../component/MediaItem";
import { TbPlayerPlay, TbPlayerPause } from "react-icons/tb";
import { AiTwotoneHeart, AiFillDelete,AiOutlinePlus } from "react-icons/ai";
import { BsThreeDots,BsFillPlusCircleFill } from "react-icons/bs";
import { RiBarChartFill} from "react-icons/ri";
import {  BiPlus} from "react-icons/bi";

// import { PlayingMusicContext } from "../../Context/PlayingMusicContext";
import img from './img/popular-music-concept-banner-header-famous-pop-singer-near-huge-microphone-singing-tiny-people-dancing-concert-industry-top-147757887.jpg'

import Button from "../../component/Button/Button";
import { useMusic } from "../../hooks/useMusic";
import UseApi from "../../API/UseApi";

import "./topmusicp.scss";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 
import { set } from "react-hook-form";



function Topmusic() {
  const { setPlaylist, playlist_Id, currentSong, togglePlay, isPlay, handleChooseSong ,handlePlayAnotherSong,playlistUser,listTrack,ShowAddSong,setShowAddSong} =
  useMusic();

  const [top, setTop] = useState([]);
  const [album, setAlbum] = useState([]);
  const [isLoading, SetIsLoading] = useState(false);
//topMusic
  const topMusic = async () => {
    SetIsLoading(true);
  try {
      const params = {size: 100}
      const response = await UseApi.topSong(params);
      response ? setTop(response) : setTop([])
  } catch (error) {
      console.log("error get list playlist: ", error);
  }finally{
    SetIsLoading(false);
  }
  };
  useEffect(() => {
      topMusic();
    }, []);

  const [active, setActive] = useState("");
  const [listTrackId, setListTrackId] =useState([]);
  const [playlistName, setPlaylistName] = useState('')
  const [NumOfTop, setNumOfTop] = useState(10)

  const show100Song = ()=> {
    const mod = document.querySelector(".show-top-100-btn");
    mod.classList.add("close");
    const mod1 = document.querySelector(".hide-top-100-btn");
    mod1.classList.add("open");
    setNumOfTop(NumOfTop + 90);
  }

  const hide100Song = ()=> {
    const mod = document.querySelector(".show-top-100-btn");
    mod.classList.remove("close");
    const mod1 = document.querySelector(".hide-top-100-btn");
    mod1.classList.remove("open");
    setNumOfTop(10);
  }

  
  
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
    <div className="singerid-container contn-topmusic">
      <div className="singerid-content">
       <div className="singerid-header">
        <div className="singer-content-img">
          <img src={img}></img> 
            <div className="singer-content-in-img">
              <h2>#Chart <RiBarChartFill/> </h2>
          </div>
        </div>
       </div>
       <div className="topmusicp-music">
  
          {isLoading ?
          <p className="topmusicp-music-loading">Loading...</p> :
          (<div className="topmusicp-music-box">
            <div className="playlist-title ">
              <div className="playlist-title-song">Tittle</div>
              <div className="playlist-title-album" style={{width:40, paddingLeft: 25}}>Album</div>
              <div className="playlist-title-time " >Time</div>
            </div>
          {top? (
            top.slice(0,NumOfTop).map((val, index) => (
              <div
                className={`playlist-item top-music-dsgp ${
                  currentSong?.id == val.id ? "active" : ""
                }`}
                key={val.id}
                onClick={() => {
                  setActive(index);
                  handleChooseSong(val, top);
                  handlePlayAnotherSong();
                }}
              >

                <div className="top-music-number"
                    style= {(index + 1<11)?{color:'#7200a1'}:{}}
                >
                    <div className="top-music-number-num">{`#${index +1}`}</div>
                </div>


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
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
        )}
        <div className="show-top-100">
          <div className="show-top-100-btn">
            <p onClick={show100Song}>Show Top 100</p>
          </div>

          <div className="hide-top-100-btn">
            <p onClick={hide100Song}>Back to Top 10</p>
          </div>
        </div>
       </div>
      </div>
    </div>
  );
}

export default Topmusic;
