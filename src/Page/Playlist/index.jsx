import React, {  useContext, useState } from "react";
import MediaItem from "../../component/MediaItem";
import { trackContext } from "../../App";
import { ImMusic } from 'react-icons/im';

import './playlist.scss'


function PlayList() {
  const lists = useContext(trackContext)
  const [active, setActive] = useState('')

  function convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours   = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds; // Return is HH : MM : SS
}
 
  return (
    <div className="playlist container"> 
      <div className="playlist-title">
        <div className="playlist-title-song">The Song</div>
        <div className="playlist-title-album">Album</div>
        <div className="playlist-title-time">Time</div>
      </div>     
      {lists ? (lists.map((val,index)=> (
        <div className={`playlist-item ${index===active && 'active'}`} key={val.id} onClick={()=>setActive(index)}>
          <div className="playlist-item-icon"><ImMusic/></div>
          <MediaItem singer={val.artist.name} SongName={val.title} img={val.artist.picture} />
          <div className="playlist-item-album">{val.album.title}</div>
          <div className="playlist-item-time">{convertHMS(val.duration)}</div>
        </div>
      ))) : <div></div>}
    </div>
  );
}

export default PlayList;
