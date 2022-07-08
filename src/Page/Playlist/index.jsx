import React, { useEffect, useState} from "react";

import { Link } from "react-router-dom";
import "./playlist.scss";
import { AiOutlinePlusCircle, AiOutlineClose } from "react-icons/ai";
import { BsPlayCircle } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
// import { ImSwitch } from "react-icons/im";
import UseApi from "../../API/UseApi";
import { useMusic } from '../../hooks/useMusic';
// import AddPlaylistForm from "../../component/addPlaylistForm/AddPlaylistForm";

// import * as GetPlaylistUser from '../../services/playlistService'


function Playlist() {

  const {currentUser, setPlaylist} = useMusic();

  const [playlistUser, setPlaylistUser] = useState([]);
  const [formRequest, setFormRequest] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  
  useEffect(() => {
    const getPlaylistUser = async () => {
      try {
        const params = {username: currentUser.username}
        const response = await UseApi.getPlaylist({params});
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
    }catch (error) {
      console.log("error post playlist: ", error);
    }
  }
  
  const onsubmit=()=>{
    setFormRequest(false);
    postPlaylist()
  }


  const delPlaylist = async (i) => {
    try{ 
      const resp = await UseApi.deletePlaylist({id: i})
      console.log(resp)
    }catch (error) {
      console.log("error post playlist: ", error);
    }
  }



  return (
    <div className="pl-container">
      <button >delete</button>
      {formRequest && (
        <div className="modal">
        <div className="modal__overlay"></div>

        <div className="modal__body">

            <form action="" className="register" id="form-register">
            <div className='create-playlist-modal'>
        <div className='create-playlist-container'>
            <div className='create-playlist-content'>
                <div className='create-playlist-from-content'>                     
                        <span to={'/playlist'} className='close-button'>
                            <AiOutlineClose onClick={() => setFormRequest(false)}/>
                        </span>
                    <div className='create-playlist-header'>
                        <h3 className='create-playlist-tittle'>Create new playlist</h3>
                    </div>
                    <input
                      className='create-playlist-name-input' 
                      placeholder='Type your playlist name'
                      onChange={(e) => setPlaylistName(e.target.value)}
                      value = {playlistName}
                    >
                    </input>
                    <div className='option'>
                        <div>
                            <h3 className='option-tittle'>Public</h3>
                            <h3 className='option-subtittle'>Everyone can see this playlist</h3>
                        </div>
                        {/* <div className='option-button1' onClick={option1}>
                            <span>
                                <ImSwitch/>
                            </span>
                        </div> */}
                    </div>
                    <div className='option'>
                        <div>
                            <h3 className='option-tittle'>Random play</h3>
                            <h3 className='option-subtittle'>Always random paly all music</h3>
                        </div>
                        {/* <div className='option-button2' onClick={option2} >
                            <span>
                                <ImSwitch/>
                            </span>
                        </div> */}
                    </div>
                    <div className='create-button'>
                        <span onClick={onsubmit}>Create new</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
            </form> 
        </div>
        
    </div>
      )}


      <div className="pl-grid">
        <div className="pl-header">
          <h1 className="pl-header-title">Playlist</h1>
          <ul className="pl-list">
            <li className="pl-item">All</li>
            <li className="pl-item">My list</li>
            <div className="pl-item-line"></div>
          </ul>
        </div>
        <div className="pl-body">
          <div className="pl-card">
            <div className="pl-empty-playlist">
              <div className="pl-icon">
                <AiOutlinePlusCircle onClick={()=> setFormRequest(true)}/>
              </div>
              <h3 className="pl-empty-playlist-title">Add new list</h3>
            </div>
          </div>

          {
            playlistUser ? playlistUser.map((val) => (
            <div className="pl-card"  key={val?.id}>
            <div className="pl-exists-playlist">
              <img
                src="https://img.freepik.com/free-vector/note-music-logo-design_93835-645.jpg?w=2000"
                alt=""
                className="pl-image"
              />
              <div className="pl-image-hover">
                <div className="pl-icon">
                  <AiOutlineClose onClick={()=> delPlaylist(val.id)}/>
                </div>
                <Link to={'/playlist/playlist_id'} className="pl-icon pl-icon-active-play"  onClick={()=> setPlaylist(val.id)}>
                  <BsPlayCircle />
                </Link>
                <div className="pl-icon">
                  <FiMoreHorizontal />
                </div>
              </div>
              <h5 className="pl-title">{val.name}</h5>
              <h6 className="pl-user">{val.user.username}</h6>
            </div>
          </div>)) : <div></div>
          }
          


        </div>
      </div>
    </div>
  );
}

export default Playlist;


