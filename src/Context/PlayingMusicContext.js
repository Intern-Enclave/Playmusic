import { Axios } from "axios";
import React, { createContext, useEffect, useRef, useState } from "react";
import apiConfig from "../API/apiConfig";
import UseApi from "../API/UseApi";

const PlayingMusicContext = createContext();

const PlayingMusicProvider = ({ children }) => {
  const [isFetchingData, setIsFetchingData] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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
  const [listTrackId, setListTrackId] =useState([]);
  const [playlistNameId, setPlaylistNameId] = useState('');
  
  //singername
  const [singername, setSingername] = useState("")
  
  // const [playlist_Id, setPlaylist_Id] = useState(0);
  //album
  const [listTrackInAlbum, setListTrackInAlbum] = useState([]);
  const [album, setAlbum] = useState();

  //playlist User
  const [playlistUser, setPlaylistUser] = useState([]);
  const [playlistName, setPlaylistName] = useState('');

  //usingPlaylist
  const [usingPlaylist, setUsingplaylist] = useState([]);

  //notification
  const [notification, setNotification] = useState([]);

  //add Song
  const [showAddSong, setShowAddSong] = useState(false)

  //Show comment
  const [ShowComment, setShowComment] = useState(false)

  const [imga, setImga] = useState('');
  // const [showAddSong, setShowAddSong] = useState(false);

  //random Song
  const [random, setRandom] = useState(false);
  
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
    // if (
    //   (currentSong.id == list[0].id && way == "prev") ||
    //   (currentSong.id == list[list.length - 1].id && way == "next")
    // )
    //   return;
    if(random){
      if (way == "prev") {
        setCurrentSong(list[Math.floor(Math.random() * list.length)]);
      }
      if (way == "next") {
        setCurrentSong(list[Math.floor(Math.random() * list.length)]);
      }
    }else{
      for (let i = 0; i < list.length; i++) {
        if (currentSong.id == list[i].id) {
          if (way == "prev") {
            setCurrentSong(list[i - 1]);
          }
          if(way == "prev" && i==0){
            setCurrentSong(list[list.length - 1])
          }
          if (way == "next") {
            setCurrentSong(list[i + 1]);
          }
          if(way == "next" && i==list.length-1){
            setCurrentSong(list[0])
          }
          if (isPlay) {
            handlePlayAnotherSong();
          }
          break;
        }
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
      setUsingplaylist(response);
    } catch (error) {
      console.log("error get list tracks: ", error);
    } finally {
      setIsLoading(false)
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
          if(user.image !== null) {
            user.image = apiConfig.baseUrl + "user/images/" + user.image;
          }
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
  }, [isFetchingData]);


  const handleLogin = (name, pass)=>{

    listUser.map(user => {
      if(user.username == name && user.password == pass) {
        setCurrentUser(user);
        setLoginFail(false);
        localStorage.setItem("currentUser", user.username);
        setNotification([{
          id: 1,
          tittle: "Succes",
          description: 'Login success', 
      }])
      }
      if(!(user.username == name && user.password == pass)){
        setLoginFail(true);
      }
      
    })
    
  }

  const loginRequest = () =>{
    setLoginFail(false)
    setLogin(true)
  }
  
  const unLoginRequest = () =>{
    setLogin(false)
    setLoginFail(false)
  }
  const registerRequest = () =>{
    setRegisterRq(true)
  }
  
  const unRegisterRequest = () =>{
    setRegisterRq(false)
  }


  const logoutRequest = () =>{
    setLogin(false)
    setCurrentUser(null)
    setPlaylistUser([])
    localStorage.setItem("currentUser", null);
  }

  //////playlistid
  const setPlaylist = (id) =>{
    setPlaylist_Id(id);
    localStorage.setItem('playlistId', id)
  }

  /////singerId

  const getPlaylistId = async () => {
    try {
      setPlaylist(localStorage.getItem('playlistId'));
      const params = {playlistId: playlist_Id }
      const response = await UseApi.getTracksId({params});
      response ? setListTrackId(response) : setListTrackId([]);

      // playlistUser.map((val)=> {
      //   if(val.id==playlist_Id){
      //     setPlaylistNameId(val.name)
      //   } 
      // })
    } catch (error) {
      console.log("error get playlistId: ", error);
    }
  };
  
  useEffect(() => {
    getPlaylistId();
  }, [playlist_Id,isFetchingData]);

  //get artist
  
//album

const setAlbumId = (id) =>{
  setAlbum(id);
  localStorage.setItem('album', id)
}

const getListTrackInAlbum = async () => { 
  try {
    setAlbumId(localStorage.getItem('album'));
    const response = await UseApi.getListTrackInAlbum({albumId: album });
    response ? setListTrackInAlbum(response) : setListTrackInAlbum([]);
    setUsingplaylist(response)
  } catch (error) {
    console.log("error get list track in album: ", error);
  }finally{
    
  }
};

useEffect(() => {
  getListTrackInAlbum();
}, [album,isFetchingData]);

  //playlist User
  const getPlaylistUser = async () => {
    setIsLoading(true)
    try {
      const params = {username: currentUser.username}
      const response = await UseApi.getPlaylist(params);
      // console.log(response)
      response ? setPlaylistUser(response) : setPlaylistUser([])
    } catch (error) {
      console.log("error get list playlist: ", error);
    }finally{
      setIsLoading(false)
    }
  };
  useEffect(() => {
    getPlaylistUser();
  }, [currentUser, isFetchingData]);

  const postPlaylist = async () => {
    setIsFetchingData(true)
    try{ 
      const temp = {name: playlistName, username: currentUser.username};
      const resp = await UseApi.postPlaylist(temp);
   
    }catch (error) {
      console.log("error post playlist: ", error);
    }
    finally{
      setIsFetchingData(false)
    }
  }

  const delPlaylist = async (i) => {
    setIsFetchingData(true);
    try{ 
      const resp = await UseApi.deletePlaylist({id: i})
      // console.log(resp)
      const newPlaylistUser = playlistUser.filter((playlist) => {
        return playlist.id !== i;
      })
      // setPlaylistUser(newPlaylistUser);
    }catch (error) {
      console.log("error post playlist: ", error);
    }
    finally{
      setIsFetchingData(false)
    }
  }


//info user
const editInfo = async (user) => {
  setIsFetchingData(true)
  try {
    const resp = await UseApi.updateInfoUser(user);
  } catch (error) {
    console.log("error edit info: ", error);
  }finally{
    setIsFetchingData(false)
  }
};


  

 

  const value = {
    isLoading,
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
    listTrackId,
    playlistNameId,
    //usingPlaylist
    usingPlaylist,
    setUsingplaylist,
    //album
    listTrackInAlbum,
    album,
    setAlbum,
    setAlbumId,
    //update data
    setIsLoading,
    setIsFetchingData,
    //notification
    notification,
    setNotification,
    //addSong
    showAddSong,
    setShowAddSong,
    //show comment
    ShowComment, 
    setShowComment,
    //singer name
    singername, 
    setSingername,
    imga, setImga,
    //random Song
    random,
    setRandom,
  };

  return (
    <PlayingMusicContext.Provider value={value}>
      {children}
    </PlayingMusicContext.Provider>
  );
};

export { PlayingMusicContext, PlayingMusicProvider };
