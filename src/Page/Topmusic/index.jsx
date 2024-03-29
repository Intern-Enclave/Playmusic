import React, { useState, useEffect } from "react";
import MediaItem from "../../component/MediaItem";
import { AiOutlinePlus } from "react-icons/ai";
import { RiBarChartFill } from "react-icons/ri";

import img from "./img/popular-music-concept-banner-header-famous-pop-singer-near-huge-microphone-singing-tiny-people-dancing-concert-industry-top-147757887.jpg";

import { useMusic } from "../../hooks/useMusic";
import UseApi from "../../API/UseApi";

import "./topmusicp.scss";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

function Topmusic() {
  const {
    setPlaylist,
    playlist_Id,
    currentSong,
    handleChooseSong,
    handlePlayAnotherSong,
    playlistUser,
    ShowAddSong,
    setShowAddSong,
  } = useMusic();

  const [top, setTop] = useState([]);
  const [isLoading, SetIsLoading] = useState(false);
  //topMusic
  const topMusic = async () => {
    SetIsLoading(true);
    try {
      const params = { size: 100 };
      const response = await UseApi.topSong(params);
      response ? setTop(response) : setTop([]);
    } catch (error) {
      console.log("error get list playlist: ", error);
    } finally {
      SetIsLoading(false);
    }
  };
  useEffect(() => {
    topMusic();
  }, []);

  const [active, setActive] = useState("");
  const [listTrackId, setListTrackId] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [NumOfTop, setNumOfTop] = useState(10);

  // const top100Totop10 = () => {
  //   if
  // }

  const show100Song = () => {
    const mod = document.querySelector(".show-top-100-btn");
    mod.classList.add("close");
    const mod1 = document.querySelector(".hide-top-100-btn");
    mod1.classList.add("open");
    setNumOfTop(NumOfTop + 90);
  };

  const hide100Song = () => {
    const mod3 = document.querySelector(".show-top-100-btn");
    mod3.classList.remove("close");
    const mod4 = document.querySelector(".hide-top-100-btn");
    mod4.classList.remove("open");
    setNumOfTop(10);
  };

  const getPlaylistId = async () => {
    try {
      setPlaylist(localStorage.getItem("playlistId"));
      const params = { playlistId: playlist_Id };
      const response = await UseApi.getTracksId({ params });
      response ? setListTrackId(response) : setListTrackId([]);

      playlistUser.map((val) => {
        if (val.id === playlist_Id) setPlaylistName(val.name);
      });
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

  return (
    <div className="singerid-container contn-topmusic">
      <div className="singerid-content">
        <div className="singerid-header">
          <div className="singer-content-img">
            <img src={img}></img>
            <div className="singer-content-in-img">
              <h2>
                #Chart <RiBarChartFill />{" "}
              </h2>
            </div>
          </div>
        </div>
        <div className="topmusicp-music">
          {isLoading ? (
            <p className="topmusicp-music-loading">Loading...</p>
          ) : (
            <div className="topmusicp-music-box">
              <div className="playlist-title ">
                <div className="playlist-title-song">Tittle</div>
                <div
                  className="playlist-title-album "
                  style={{ width: 40, paddingLeft: 40 }}
                >
                  Album
                </div>
                <div className="playlist-title-time ">Time</div>
              </div>
              {top ? (
                top.slice(0, NumOfTop).map((val, index) => (
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
                    <div
                      className="top-music-number"
                      style={index + 1 < 11 ? { color: "#7200a1" } : {}}
                    >
                      <div className="top-music-number-num">{`#${
                        index + 1
                      }`}</div>
                    </div>

                    <Tippy delay={[0, 200]} content="Add Playlist">
                      <button
                        className="playlist-item-icon"
                        onClick={() => setShowAddSong(!ShowAddSong)}
                      >
                        <AiOutlinePlus />
                      </button>
                    </Tippy>

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
                ))
              ) : (
                <div></div>
              )}
            </div>
          )}
          <div className="show-top-100" >
            <div className="show-top-100-btn" onClick={show100Song}>
              <p>Show Top 100</p>
            </div>

            <div className="hide-top-100-btn" onClick={hide100Song}>
              <p>Back to Top 10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topmusic;
