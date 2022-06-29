import React, { useState, useRef, useContext } from "react";
import TimeSlider from "react-input-slider";

import { TbPlayerTrackNext, TbPlayerTrackPrev, TbPlayerPlay, TbPlayerPause } from 'react-icons/tb';
import { PlayingMusicContext } from "../../Context/PlayingMusicContext";


import './playlist.scss'
import { useMusic } from "../../hooks/useMusic";

const Controls = () => {
  const { listTrack, isPlay, togglePlay, currentSong, songRef,handleChangeSong} = useMusic()
  
  const [audioIndex, setAudioIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);


 

  const handleLoadedData = () => {
    setDuration(songRef.current.duration);
    if (isPlay) songRef.current.play();
  };

  const handlePausePlayClick = () => {

   togglePlay()
  };

  const handleTimeSliderChange = ({ x }) => {
    songRef.current.currentTime = x;
    setCurrentTime(x);

    if (!isPlay) {
     togglePlay()
      songRef.current.play();
    }
  };

 

  return (
    <div className="Controls">
      <div className="Control-Button-Group">
        <div
          className="Prev-Button"
          onClick={() => handleChangeSong('prev')}
        >
          <TbPlayerTrackPrev />
        </div>
        <div className="Pause-Play-Button" onClick={handlePausePlayClick}>
          {isPlay ? <TbPlayerPause /> : <TbPlayerPlay />}
        </div>
        <div
          className="Next-Button"
          onClick={() => 
            handleChangeSong('next')}
        >
          <TbPlayerTrackNext />
        </div>
      </div>
      <TimeSlider
        axis="x"
        xmax={duration}
        x={currentTime}
        onChange={handleTimeSliderChange}
        className= 'timeSlide'
        styles={{
          track: {
            backgroundColor: "#e3e3e3",
            height: "2px",
          },
          active: {
            backgroundColor: "#333",
            height: "2px",
          },
          thumb: {
            marginTop: "-3px",
            width: "8px",
            height: "8px",
            backgroundColor: "#333",
            borderRadius: 0,
          },
        }}
      />
      <audio
        ref={songRef}
        src={currentSong?.preview}
        onLoadedData={handleLoadedData}
        onTimeUpdate={() => setCurrentTime(songRef.current.currentTime)}
        onEnded={() =>togglePlay()}
      />
    </div>
  );
};

export default Controls;