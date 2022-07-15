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
  const [registerRq,setRegisterRq] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [loginFail, setLoginFail] = useState(false);

  //playlistid
  const [playlist_Id, setPlaylist_Id] = useState(0);
  // const [playlist_Id, setPlaylist_Id] = useState(0);

  //playlist User
  const [playlistUser, setPlaylistUser] = useState([]);
  const [playlistName, setPlaylistName] = useState('');

  //usingPlaylist
  const [usingPlaylist, setUsingplaylist] = useState([]);

  
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
      (currentSong.id == list[list.length - 1].id && way == "next")
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

  const handleChooseSong = (song,list) => {
    setCurrentSong(song);
    setUsingplaylist(list);
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
        setCurrentUser(user);
        setLoginFail(false);
        localStorage.setItem("currentUser", user.username);
        alert('Success')
      }
      if(!(user.username == name && user.password == pass)){
        setLoginFail(true);
      }
      
    })
    
  }

  const loginRequest = () =>{
    setLogin(true)
  }
  
  const unLoginRequest = () =>{
    setLogin(false)
  }
  const registerRequest = () =>{
    setRegisterRq(true)
  }
  
  const unRegisterRequest = () =>{
    setRegisterRq(false)
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

  //playlist User
  useEffect(() => {
    const getPlaylistUser = async () => {
      try {
        const params = {username: currentUser.username}
        const response = await UseApi.getPlaylist(params);
        // console.log(response)
        response ? setPlaylistUser(response) : setPlaylistUser([])
      } catch (error) {
        console.log("error get list playlist: ", error);
      }
    };
    getPlaylistUser();
  }, [currentUser]);

  const postPlaylist = async () => {
    try{ 
      const temp = {name: playlistName, username: currentUser.username};
      const resp = await UseApi.postPlaylist(temp);
      console.log(resp)
      setPlaylistUser([...playlistUser, resp])
    }catch (error) {
      console.log("error post playlist: ", error);
    }
  }

  const delPlaylist = async (i) => {
    try{ 
      const resp = await UseApi.deletePlaylist({id: i})
      // console.log(resp)
      const newPlaylistUser = playlistUser.filter((playlist) => {
        return playlist.id !== i;
      })
      setPlaylistUser(newPlaylistUser);
    }catch (error) {
      console.log("error post playlist: ", error);
    }
  }


  ///choose list track
  // const handleChooseList = (list) => {
  //   // localStorage.setItem('usingList', list)
  //   setUsingplaylist(list) 
  // } 
  

 

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
    setCurrentUser,
    login,
    // user,
    listUser,
    loginFail,
    setLoginFail,
    setListUser,
    handleLogin,
    loginRequest,
    logoutRequest,
    unLoginRequest,
    registerRq,
    registerRequest,
    unRegisterRequest,
    getAllUser,
    // playlist,
    setPlaylist,
    //playlistUser
    playlistUser,
    playlistName,
    setPlaylistName,
    postPlaylist,
    delPlaylist,
    // listTrackId,
    playlist_Id,
    //usingPlaylist
    usingPlaylist,
    setUsingplaylist,
  };

  return (
    <PlayingMusicContext.Provider value={value}>
      {children}
    </PlayingMusicContext.Provider>
  );
};

export { PlayingMusicContext, PlayingMusicProvider };
