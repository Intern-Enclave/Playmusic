import React from "react";
import "./addplaylistform.scss";
import "tippy.js/dist/tippy.css";
import {AiOutlineClose} from "react-icons/ai";
import { Link } from "react-router-dom";

function AddPlaylistForm(props) {
 
  return (
    <div className="modal">
      <div className="modal__overlay"></div>

      <div className="modal__body">
        <form action="" className="register" id="form-register">
          <div className="create-playlist-modal">
            <div className="create-playlist-container">
              <div className="create-playlist-content">
                <div className="create-playlist-from-content">
                  <Link to={"/playlist"} className="close-button">
                    <AiOutlineClose />
                  </Link>
                  <div className="create-playlist-header">
                    <h3 className="create-playlist-tittle">
                      Create new playlist
                    </h3>
                  </div>
                  <input
                    className="create-playlist-name-input"
                    placeholder="Type your playlist name"
                  ></input>
                  <div className="option">
                    <div>
                      <h3 className="option-tittle">Public</h3>
                      <h3 className="option-subtittle">
                        Everyone can see this playlist
                      </h3>
                    </div>
                    {/* <div className='option-button1' onClick={option1}>
                                <span>
                                    <ImSwitch/>
                                </span>
                            </div> */}
                  </div>
                  <div className="option">
                    <div>
                      <h3 className="option-tittle">Random play</h3>
                      <h3 className="option-subtittle">
                        Always random paly all music
                      </h3>
                    </div>
                    {/* <div className='option-button2' onClick={option2} >
                                <span>
                                    <ImSwitch/>
                                </span>
                            </div> */}
                  </div>
                  <div className="create-button">
                    <span>Create new</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPlaylistForm;
