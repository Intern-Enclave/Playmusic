import React, { useState, useEffect } from "react";
import MediaItem from "../../component/MediaItem";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import { FaMusic } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

import "./playlist.scss";
import { useMusic } from "../../hooks/useMusic";
import UseApi from "../../API/UseApi";
import Toastmenu from "../../component/Toast";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

function PlaylistId() {
  const {
    playlist_Id,
    currentSong,
    isPlay,
    handleChooseSong,
    handlePlayAnotherSong,
    playlistUser,
    setIsFetchingData,
    listTrackId,
    currentUser,
  } = useMusic();

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
      
  }


  const [playlistName, setPlaylistName] = useState(null);
  const [newPlaylistName, setNewPlaylistName] = useState(null);
  const [formRequest, setFormRequest] = useState(false);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    playlistUser.map((val) => {
      if (val.id == playlist_Id) {
        setPlaylistName(val.name);
      }
    });
  }, [playlistUser]);

  const delSong = async (i) => {
    setIsFetchingData(true);
    try {
      const resp = await UseApi.deleteSong({
        trackId: i,
        playlistId: playlist_Id,
      });
      console.log(resp);
      const newPlaylistId = listTrackId.filter((playlist) => {
        return playlist.id !== i;
      });
    } catch (error) {
      console.log("error post playlist: ", error);
    } finally {
      setIsFetchingData(false);
    }
  };

  const editPlaylistName = async () => {
    setIsFetchingData(true);
    try {
      const temp = {
        name: playlistName,
        rename: newPlaylistName,
        username: currentUser?.username,
      };
      const resp = await UseApi.updatePlaylistName(temp);
      // console.log(temp)
    } catch (error) {
      console.log("error edit playlist name ", error);
    } finally {
      setIsFetchingData(false);
    }
  };

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
      <Toastmenu toastlist={List} setList= {setList}/>
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
        </div>
      )}

      <div className="playlist-info container">
        <div className="playlist-music">
          <div className="playlist-music-cd">
            {(listTrackId?.length > 0) ? 
              <img
                src={
                  play
                    ? currentSong.artist?.picture_xl
                    : listTrackId[0]?.artist?.picture_xl
                }
                alt=""
                className={`playlist_id-music-img ${
                  isPlay && play ? "play" : ""
                }`}
              /> :
              <img
                src='https://img.freepik.com/free-vector/note-music-logo-design_93835-645.jpg?w=2000'
                alt=""
                className={`playlist_id-music-img ${
                  isPlay && play ? "play" : ""
                }`}
              /> 
            }
            {playlistName && (
              <div className="playlist_id-cd-title">
                <h2 className="playlist_id-cd-title-name">{playlistName}</h2>
                <span
                  className="playlist_id-cd-title-icon"
                  onClick={() => setFormRequest(true)}
                >
                  <FiEdit />
                </span>
              </div>
            )}
          </div>
          <div className="playlist-music-info container">
            <h3 className="playlist-music-info-name">
              {play ? currentSong?.title : listTrackId[0]?.title}
            </h3>
          </div>
        </div>
      </div>

      {(listTrackId?.length >0) ? 
        (<div>
          <div className="playlist-title">
            <div className="playlist-title-song">The Song</div>
            <div className="playlist-title-album">Album</div>
            <div className="playlist-title-time">Time</div>
          </div>
          {listTrackId ? (
            listTrackId?.map((val, index) => (
              <div
                className={`playlist-item-wraper ${
                  currentSong?.id == val.id ? "active" : ""
                }`}
                key={val.id}
              >
                <Tippy delay={[0, 200]} content="Delete">
                  <button
                    className="icon-de"
                    onClick={() => {delSong(val.id);handleShowToastMenu('success',val.title,playlistName)}}
                  >
                    <AiFillDelete />
                  </button>
                </Tippy>
                <div
                  onClick={() => {
                    handleChooseSong(val, listTrackId);
                    handlePlayAnotherSong();
                    setPlay(true);
                    
                  }}
                  className={`playlist-item`}
                >
                  <MediaItem
                    singer={val.artist.name}
                    SongName={val.title}
                    img={val.artist.picture_xl}
                  />
                  <div className="playlist-item-album">{val.album.title}</div>
                  <div className="playlist-item-time">
                    {convertHMS(val.duration)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>): 
        (
          <div className="content-default">
            <i className="content-default-icon"><FaMusic /></i>
            <p className="content-default-message">There are no songs in the playlist yet</p>
          </div>
        )
        
      }
    </div>
  );
}

export default PlaylistId;
