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
import { Link } from "react-router-dom";

import "./singer.scss";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 



function Singer() {
  const {  listTrack ,setPlaylist, playlist_Id, currentSong, togglePlay, isPlay, handleChooseSong ,handlePlayAnotherSong,playlistUser, singername, 
    setSingername,imga, setImga,} =
  useMusic();

 
  const [listTrackId, setListTrackId] =useState([]);
  const [playlistName, setPlaylistName] = useState('')
  const [Listartists, setListartists] = useState([])
  const [List5artist, setList5artist] = useState([]);

  useEffect(() => {
    const listSingerss = async () => {
    try {
        const params = {size: 10, page: 1}
        const response = await UseApi.getAllArtist(params);
        response ? setListartists(response) : setListartists([])

    } catch (error) {
        console.log("error get artist: ", error);
    }
    };
    listSingerss();
}, []);

  useEffect(() => {
    const list5artists = async () => {
    try {
        //const params = {size: 10, page: 1}
        const response = await UseApi.get5Artist();
        response ? setList5artist(response) : setList5artist([])

    } catch (error) {
        console.log("error get 5 artist: ", error);
    }
    };
    list5artists();
  }, []);

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
              {List5artist ? (
                List5artist.slice(0,5).map((val, index) => (
                  <div className="singer-like-item"
                        Key = {val.id}      
                  >
                      <div className="singer-like-img"
                        onClick={()=>{setSingername(val.name);setImga(val.picture)}}
                      >
                        <Link to={'/singerId'}>
                          <img src = {val.picture}></img>
                        </Link>
                        <span><BsDiscFill/></span>
                      </div>
                      <div className="singer-like-desc">
                        <p>{val.name} </p>
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
            {Listartists ? (
                  Listartists.map((val, index) => (
                    <div className="orther-singer-item"
                        Key = {val.id}
                    > 
                      <div className="orther-singer-img"
                            onClick={()=>{setSingername(val.name);setImga(val.picture)}}
                      >
                      <Link to={'/singerId'}>
                        <img src = {val.picture}></img>
                      </Link>
                        <span><BsDiscFill/></span>
                      </div>
                      <div className="orther-singer-desc">
                        <p>{val.name}</p>
                      </div> 
                    </div>
                  ))
              ) : (
              <div></div>
            )}

                {listTrack ? (
                  listTrack.map((val, index) => (
                    <div className="orther-singer-item"
                        Key = {val.id}
                    > 
                      <div className="orther-singer-img"
                            onClick={()=>{setSingername(val.artist.name);setImga(val.artist.picture)}}
                      >
                      <Link to={'/singerId'}>
                        <img src = {val.artist.picture}></img>
                      </Link>
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
