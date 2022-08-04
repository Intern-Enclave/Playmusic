import React, { useState } from "react";
import TimeSlider from "react-input-slider";

import { TbPlayerTrackNext, TbPlayerTrackPrev, TbPlayerPlay, TbPlayerPause } from 'react-icons/tb';
import { FaRandom } from 'react-icons/fa';
import { FiRepeat } from 'react-icons/fi';
// import { PlayingMusicContext } from "../../Context/PlayingMusicContext";

import './playlist.scss'
import { useMusic } from "../../hooks/useMusic";

const Controls = () => {
  const { isPlay, togglePlay, currentSong, songRef,handleChangeSong,listTrack,usingPlaylist,setRandom, random} = useMusic()
  
  // const [audioIndex, setAudioIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const scrollToActiveSong = ()=>{
    document.getElementsByClassName('active').scrollIntoView()
  }

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

  function convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds; // Return is HH : MM : SS
  }

  return (
    <div className="Controls">
      <span className="duration-left">{convertHMS(currentTime)}</span>
      <div className="Control-Button-Group">
        <div
          className={`repeat-Button ${!random ? 'randomActive' : ''}`}
          onClick={() => setRandom(false)}
        >
          <FiRepeat />
        </div>
        <div
          className="Prev-Button"
          // onClick={() => handleChangeSong('prev', listTrack)}
          onClick={() => {handleChangeSong('prev', usingPlaylist)}}
        >
          <TbPlayerTrackPrev />
        </div>
        <div className="Pause-Play-Button" onClick={handlePausePlayClick}>
          {isPlay ? <TbPlayerPause /> : <TbPlayerPlay />}
        </div>
        <div
          className="Next-Button"
          onClick={() => 
           { handleChangeSong('next', usingPlaylist) }
          }
        >
          <TbPlayerTrackNext />
        </div>

        <div
          className={`random-Button ${random ? 'randomActive' : ''}`}
          onClick={() => setRandom(true)}
        >
          <FaRandom />
        </div>
      </div>
      <span className="duration-right">{convertHMS(duration)}</span>
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