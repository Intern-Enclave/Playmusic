import React, { createContext, useEffect, useRef, useState } from "react";
import UseApi from "../API/UseApi";

const PlayingMusicContext = createContext();

const PlayingMusicProvider = ({ children }) => {
  const [isPlay, setIsPlay] = useState(false);
  const [listTrack, setListTrack] = useState([]);
  const [currentSong, setCurrentSong] = useState({});
  const songRef = useRef(null);
  //login
  const [currentUser, setCurrentUser] = useState(null);
  const [login, setLogin] = useState(false);
  const [listUser, setListUser] = useState([])
  const [username, setUsername ] =useState('')
  const [password, setPassword] = useState('')


  //control music
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

  
  ///login
  const getAllUser = async () => {
    try {
      const response = await UseApi.getAllUser();
      let isFirstTimeLogin = localStorage.getItem("currentUser") == null;
      if (isFirstTimeLogin) {
        setCurrentUser(null);
      } else {
        let cUser = localStorage.getItem("currentUser");
        response.map((user) => {
          if (user.username == cUser) setCurrentUser(user);
        });
      }

      setListUser(response);
    } catch (error) {
      console.log("error get list User: ", error);
    }
  };
  
  useEffect(() => {
    getAllUser();
  }, []);


  const handleLogin = (name, pass)=>{

    listUser.map(user => {
      if(user.username == name && user.password == pass) {
        setCurrentUser(user)
        // alert('success')
        localStorage.setItem("currentUser", user.username);
        console.log('dang nhap thanh cong')
      }
      
      // if(!(user.username == name && user.password == pass)) {
      //   setCurrentUser(null)
      //   setLogin(true)
      // } 
    })
    
  }



  const loginRequest = () =>{
    setLogin(true)
  }

  const logoutRequest = () =>{
    setLogin(false)
    setCurrentUser(false)
    localStorage.setItem("currentUser", null);
  }

  const value = {
    isPlay,
    listTrack,
    currentSong,
    songRef,
    togglePlay,
    handlePlayAnotherSong,
    handleChooseSong,
    handleChangeSong,

    currentUser,
    login,
    // user,
    listUser,
    username,
    password,
    handleLogin,
    loginRequest,
    logoutRequest,
  };

  return (
    <PlayingMusicContext.Provider value={value}>
      {children}
    </PlayingMusicContext.Provider>
  );
};

export { PlayingMusicContext, PlayingMusicProvider };
