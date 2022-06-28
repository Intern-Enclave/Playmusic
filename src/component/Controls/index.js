import React, { useState, useRef, useContext } from "react";
import TimeSlider from "react-input-slider";

import { TbPlayerTrackNext, TbPlayerTrackPrev, TbPlayerPlay, TbPlayerPause } from 'react-icons/tb';
import { dataMusic  } from "./data";

import './playlist.scss'
import { PlayingMusicContext } from "../../Context/PlayingMusicContext";

const Controls = () => {

  const audioRef = useRef();
  const [audioIndex, setAudioIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const context = useContext(PlayingMusicContext);
  // const trackContexts = useContext(trackContext)

  // console.log(trackContexts)

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
    if (context.isPlay) audioRef.current.play();
  };

  const handlePausePlayClick = () => {
    if (context.isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    context.togglePlay()
  };

  const handleTimeSliderChange = ({ x }) => {
    audioRef.current.currentTime = x;
    setCurrentTime(x);

    if (!context.isPlay) {
      context.togglePlay()
      audioRef.current.play();
    }
  };

  return (
    <div className="Controls">
      {/* <img className="Song-Thumbnail" src={TetImg} alt="tet" /> */}
      {/* <h2 className="Song-Title">{audios[audioIndex].title}</h2> */}
      {/* <p className="Singer">{audios[audioIndex].artist}</p> */}
      <div className="Control-Button-Group">
        <div
          className="Prev-Button"
          onClick={() => setAudioIndex((audioIndex - 1) % dataMusic?.length)}
        >
          <TbPlayerTrackPrev />
        </div>
        <div className="Pause-Play-Button" onClick={handlePausePlayClick}>
          {context.isPlay ? <TbPlayerPause /> : <TbPlayerPlay />}
        </div>
        <div
          className="Next-Button"
          onClick={() => setAudioIndex((audioIndex + 1) % dataMusic?.length)}
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
        ref={audioRef}
        src={dataMusic[audioIndex]?.preview}
        onLoadedData={handleLoadedData}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onEnded={() => context.togglePlay()}
      />
    </div>
  );
};

export default Controls;