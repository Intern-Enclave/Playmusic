import React, { createContext, useEffect, useRef, useState } from "react";
import UseApi from "../API/UseApi";

const PlayingMusicContext = createContext();

const PlayingMusicProvider = ({ children }) => {
  const [isPlay, setIsPlay] = useState(false);
  const [listTrack, setListTrack] = useState([]);
  const [currentSong, setCurrentSong] = useState({});
  const songRef = useRef(null);
  const [usingTracks, setUsingTracks] = useState([]); 
  //login
  const [currentUser, setCurrentUser] = useState(null);
  const [login, setLogin] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [username, setUsername ] =useState('');
  const [password, setPassword] = useState('');
  //playlistid
  const [playlist_Id, setPlaylist_Id] = useState(0);


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
  
  const handleChangeSong = (way, list) => {
    if (
      (currentSong.id == list[0].id && way == "prev") ||
      (currentSong.id == list[listTrack.length - 1].id && way == "next")
    )
      return;
    for (let i = 0; i < list.length; i++) {
      if (currentSong.id == list[i].id) {
        if (way == "prev") {
          setCurrentSong(list[i - 1]);
        }
        if (way == "next") {
          setCurrentSong(list[i + 1]);
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
  
  const unLoginRequest = () =>{
    setLogin(false)
  }


  const logoutRequest = () =>{
    setLogin(false)
    setCurrentUser(false)
    localStorage.setItem("currentUser", null);
  }

  //////playlistid
  const setPlaylist = (id) =>{
    setPlaylist_Id(id);
    localStorage.setItem('playlistId', id)
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
    unLoginRequest,
    // playlist,
    setPlaylist,
    // listTrackId,
    playlist_Id,
  };

  return (
    <PlayingMusicContext.Provider value={value}>
      {children}
    </PlayingMusicContext.Provider>
  );
};

export { PlayingMusicContext, PlayingMusicProvider };
