import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';

import TimeSlider from "react-input-slider";
import { TbPlayerTrackNext, TbPlayerTrackPrev, TbPlayerPlay, TbPlayerPause } from 'react-icons/tb';
import './playlist.scss';

// import { dataMusic as data } from "../../component/Controls/data";

const PlayList = () => {

  const audioRef = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlay, setPlay] = useState(false);
  const [data, setData] = useState([]); 
  const [audioIndex, setAudioIndex] = useState(0);

  
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

    const getData = () => {
      axios
        .get("http://localhost:3000/data")
        .then(function (response) {
          setData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    };
    
    useEffect(() => {
      getData()
    }, [] )

  return ( 
    <div className="PlayList">
      <h2>akjsbhb</h2>
      {/* <img className="Song-Thumbnail" src='https://anhdep123.com/wp-content/uploads/2021/01/nhung-hinh-anh-hoang-hon-buon.jpg' alt="tet" /> */}
      <div className="Control-Button-Group">
        <div 
          className="Prev-Button"
          onClick={() => setAudioIndex((audioIndex - 1) % data?.length)}
        >
          <TbPlayerTrackPrev />
        </div>
        <div className="Pause-Play-Button" onClick={handlePausePlayClick}>
          {isPlay ? <TbPlayerPause /> : <TbPlayerPlay />}
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
            src={data[audioIndex]?.preview}
            onLoadedData={handleLoadedData}
            onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
            onEnded={() => setPlay(false)}
          />
  
    </div>
  );
};
    
export default PlayList;
        
        
  
  
    

  


   