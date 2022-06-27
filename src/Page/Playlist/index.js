import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";

// import {usePausePlayClick} from "../../CustomHook/handlePausePlayClick";
import TimeSlider from "react-input-slider";
import {
  TbPlayerTrackNext,
  TbPlayerTrackPrev,
  TbPlayerPlay,
  TbPlayerPause,
} from "react-icons/tb";
import "./playlist.scss";
import { PlayingMusicContext } from "../../Context/PlayingMusicContext";

// import { dataMusic as data } from "../../component/Controls/data";

function PlayList({ data }) {
  const context = useContext(PlayingMusicContext)
 
  const audioRef = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
 

  const [audioIndex, setAudioIndex] = useState(0);

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
    <div className="PlayList">
      {/* <img className="Song-Thumbnail" src='https://anhdep123.com/wp-content/uploads/2021/01/nhung-hinh-anh-hoang-hon-buon.jpg' alt="tet" /> */}
      <div className="Control-Button-Group">
        <div
          className="Prev-Button"
          onClick={() => setAudioIndex((audioIndex - 1) % data?.length)}
        >
          <TbPlayerTrackPrev />
        </div>
        <div className="Pause-Play-Button" onClick={handlePausePlayClick}>
          {context.isPlay ? <TbPlayerPause /> : <TbPlayerPlay />}
        </div>
        <div
          className="Next-Button"
          onClick={() => setAudioIndex((audioIndex + 1) % data?.length)}
        >
          <TbPlayerTrackNext />
        </div>
      </div>

      <TimeSlider
        axis="x"
        xmax={duration}
        x={currentTime}
        onChange={handleTimeSliderChange}
        className="timeSlide"
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
        src={data[audioIndex]?.preview}
        onLoadedData={handleLoadedData}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onEnded={() =>   context.togglePlay()}
      />
    </div>
  );
}

export default PlayList;
