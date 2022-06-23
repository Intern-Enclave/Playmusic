import React, { useState, useRef } from "react";
import TimeSlider from "react-input-slider";

import SvgPauseIcon from "./icons/PauseIcon";
import SvgPlayIcon from "./icons/PlayIcon";
import SvgPrevIcon from "./icons/PrevIcon";
import SvgNextIcon from "./icons/NextIcon";
import { dataMusic } from "./data";

const audios = dataMusic.reduce((course, val) => (
  course.concat({title:val.title, src:val.preview, artist: val.artist})
),[])

// console.log(data)


const Controls = () => {
  const audioRef = useRef();
  const [audioIndex, setAudioIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlay, setPlay] = useState(false);

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
    if (isPlay) audioRef.current.play();
  };

  const handlePausePlayClick = () => {
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlay(!isPlay);
  };

  const handleTimeSliderChange = ({ x }) => {
    audioRef.current.currentTime = x;
    setCurrentTime(x);

    if (!isPlay) {
      setPlay(true);
      audioRef.current.play();
    }
  };

  return (
    <div className="Controls">
      {/* <img className="Song-Thumbnail" src={TetImg} alt="tet" /> */}
      <h2 className="Song-Title">{audios[audioIndex].title}</h2>
      <p className="Singer">{audios[audioIndex].artist}</p>
      <div className="Control-Button-Group">
        <div
          className="Prev-Button"
          onClick={() => setAudioIndex((audioIndex - 1) % audios.length)}
        >
          <SvgPrevIcon />
        </div>
        <div className="Pause-Play-Button" onClick={handlePausePlayClick}>
          {isPlay ? <SvgPauseIcon /> : <SvgPlayIcon />}
        </div>
        <div
          className="Next-Button"
          onClick={() => setAudioIndex((audioIndex + 1) % audios.length)}
        >
          <SvgNextIcon />
        </div>
      </div>
      <TimeSlider
        axis="x"
        xmax={duration}
        x={currentTime}
        onChange={handleTimeSliderChange}
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
        src={audios[audioIndex].src}
        onLoadedData={handleLoadedData}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onEnded={() => setPlay(false)}
      />
    </div>
  );
};

export default Controls;
