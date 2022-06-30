import React, { createContext, useEffect, useRef, useState } from "react";
import UseApi from "../API/UseApi";

const PlayingMusicContext = createContext();

const PlayingMusicProvider = ({ children }) => {
  const [isPlay, setIsPlay] = useState(false);
  const [listTrack, setListTrack] = useState([]);
  const [currentSong, setCurrentSong] = useState({});
  const songRef = useRef(null);

  const handlePlayAnotherSong = () => {
    setIsPlay(true);
    songRef.current.play();
  };
  
  const togglePlay = () => {
    if (isPlay) {
      songRef.current.pause();
    } else {
      songRef.current.play();
    }
    setIsPlay(!isPlay);
  };
  
  const handleChangeSong = (way) => {
    if (
      (currentSong.id == listTrack[0].id && way == "prev") ||
      (currentSong.id == listTrack[listTrack.length - 1].id && way == "next")
    )
      return;
    for (let i = 0; i < listTrack.length; i++) {
      if (currentSong.id == listTrack[i].id) {
        if (way == "prev") {
          setCurrentSong(listTrack[i - 1]);
        }
        if (way == "next") {
          setCurrentSong(listTrack[i + 1]);
        }
        if (isPlay) {
          handlePlayAnotherSong();
        }
        break;
      }
    }
  };

  const handleChooseSong = (song) => {
    setCurrentSong(song);
    localStorage.setItem("songId", song.id);
  };
  
  const getAll = async () => {
    try {
      const response = await UseApi.getAllTracks();

      let isFirstTimeLogin = localStorage.getItem("songId") == null;
      if (isFirstTimeLogin) {
        setCurrentSong(response[0] || {});
      } else {
        let id = localStorage.getItem("songId");
        response.map((song) => {
          if (song.id == id) setCurrentSong(song);
        });
      }
      setListTrack(response);
    } catch (error) {
      console.log("error get list tracks: ", error);
    }
  };
  
  useEffect(() => {
    getAll();
  }, []);

  const value = {
    isPlay,
    listTrack,
    currentSong,
    songRef,
    togglePlay,
    handlePlayAnotherSong,
    handleChooseSong,
    handleChangeSong,
  };

  return (
    <PlayingMusicContext.Provider value={value}>
      {children}
    </PlayingMusicContext.Provider>
  );
};

export { PlayingMusicContext, PlayingMusicProvider };
