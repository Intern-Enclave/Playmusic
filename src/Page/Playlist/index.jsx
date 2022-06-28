import React, {  useContext } from "react";
import MediaItem from "../../component/MediaItem";
import { trackContext } from "../../App";

import { AiTwotoneHeart } from 'react-icons/ai';

import './playlist.scss'


function PlayList() {
  const lists = useContext(trackContext)
 
  return (
    <div className="PlayList">
      {lists.data?.map((val)=> (
        <div className="playlist-item" key={val.id}>
          <MediaItem singer={val.artist.name} SongName={val.title} img={val.artist.picture} />
          <div className="playlist-item-album">{val.album.title}</div>
          <AiTwotoneHeart className="heart"/>
        </div>
      ))}
    </div>
  );
}

export default PlayList;
