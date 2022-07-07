import React, { useEffect, useState} from "react";

import { Link } from "react-router-dom";
import "./playlist.scss";
import { AiOutlinePlusCircle, AiOutlineClose } from "react-icons/ai";
import { BsPlayCircle } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import UseApi from "../../API/UseApi";
import { useMusic } from '../../hooks/useMusic';
// import * as GetPlaylistUser from '../../services/playlistService'


function Playlist() {

  const {currentUser, setPlaylist} = useMusic();

  const [playlistUser, setPlaylistUser] = useState([])
  
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
  
  return (
    <div className="pl-container">
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
                <AiOutlinePlusCircle />
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
                  <AiOutlineClose />
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


