import React, { useEffect, useState, useRef } from "react";
import { createPortal, findDOMNode } from "react-dom";
import cls from "classnames";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import { FormattedTime } from "react-player-controls";

import Slider from "rc-slider";

const files = [
  "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4",
  "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3",
  "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_1920_18MG.mp4"
];

const SpeakerOffIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 16 16"
    height="26"
    width="26"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M8 2.81v10.38c0 .67-.81 1-1.28.53L3 10H1c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h2l3.72-3.72C7.19 1.81 8 2.14 8 2.81zm7.53 3.22l-1.06-1.06-1.97 1.97-1.97-1.97-1.06 1.06L11.44 8 9.47 9.97l1.06 1.06 1.97-1.97 1.97 1.97 1.06-1.06L13.56 8l1.97-1.97z"
    ></path>
  </svg>
);

const SpeakerOnIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 16 16"
    height="26"
    width="26"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M12 8.02c0 1.09-.45 2.09-1.17 2.83l-.67-.67c.55-.56.89-1.31.89-2.16 0-.85-.34-1.61-.89-2.16l.67-.67A3.99 3.99 0 0 1 12 8.02zM7.72 2.28L4 6H2c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h2l3.72 3.72c.47.47 1.28.14 1.28-.53V2.81c0-.67-.81-1-1.28-.53zm5.94.08l-.67.67a6.996 6.996 0 0 1 2.06 4.98c0 1.94-.78 3.7-2.06 4.98l.67.67A7.973 7.973 0 0 0 16 8c0-2.22-.89-4.22-2.34-5.66v.02zm-1.41 1.41l-.69.67a5.05 5.05 0 0 1 1.48 3.58c0 1.39-.56 2.66-1.48 3.56l.69.67A5.971 5.971 0 0 0 14 8.02c0-1.65-.67-3.16-1.75-4.25z"
    ></path>
  </svg>
);

const NextIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path>
  </svg>
);

const PreviousIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path>
  </svg>
);

const PlayIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    className="react-jinke-music-player-play-icon"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"></path>
  </svg>
);

const PauseIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    className="react-jinke-music-player-pause-icon"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm-16 328c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160zm112 0c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160z"></path>
  </svg>
);
export default function Player(props) {
  const { className, style } = props;

  const playerRef = useRef(null);
  const [isPlaying, setPlaying] = useState(false);

  const [isMuted, setMuted] = useState(false);
  const [index, setIndex] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [progessObj, setProgressObj] = useState({});

  const currentFile = files[index];

  console.log("proge obj---", progessObj, { volume, duration });

  function handleClickFullscreen() {
    screenfull.request(findDOMNode(playerRef.current));
  }

  setTimeout(() => {
    console.log("--->", findDOMNode(playerRef.current));
  }, 2000);
  // useEffect(() => {
  //   if(volume === 0 & isMuted){
  //     setMuted(true)
  //   }
  // }, [volume, ]);

  return createPortal(
    <div
      className={cls("react-jinke-music-player-main", className)}
      style={style}
      tabIndex="-1"
    >
      <div className="player-wrapper">
        <ReactPlayer
          ref={playerRef}
          progressInterval={500}
          volume={volume}
          playing={isPlaying}
          muted={isMuted}
          url={currentFile}
          className="player"
          width="100%"
          height="100%"
          onDuration={(d) => setDuration(d)}
          onProgress={(o) => setProgressObj(o)}
        />
      </div>

      <div className="music-player-panel translate">
        <section className="panel-content">
          <div
            className="img-content img-rotate img-rotate-pause"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1505430111830-b998ef798efa?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8c2luZ2VyfGVufDB8MnwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')"
            }}
          ></div>
          <div className="progress-bar-content">
            <span className="audio-title" title="rueba - julio torres">
              rueba - julio torres
            </span>
            <section className="audio-main">
              <span className="current-time">
                <FormattedTime numSeconds={0} />
              </span>
              <div className="progress-bar">
                <div
                  className="progress-load-bar"
                  style={{
                    width: `${Math.min(progessObj.loaded * 100, 100)}%`
                  }}
                />
                <Slider
                  max={Math.ceil(duration)}
                  defaultValue={0}
                  value={Math.ceil(progessObj.playedSeconds)}
                  onChange={(v) => {
                    // setDuration(v);
                    console.log("duration change---", v);

                    playerRef.current.seekTo(parseFloat(v), "seconds");
                  }}
                />
              </div>
              <span className="duration">
                <FormattedTime numSeconds={duration} />
              </span>

              {/* <span className="duration">
                {`${Math.min(progessObj.loaded * 100, 100)}%`}
              </span> */}
            </section>
          </div>
          <div className="player-content">
            <span className="group">
              <span
                className="group prev-audio"
                title="Previous track"
                onClick={() => {
                  if (index === 0) {
                    return;
                  }
                  setIndex(index - 1);
                }}
              >
                <PreviousIcon />
              </span>
              <span
                className="group play-btn"
                title="Click to play"
                onClick={() => setPlaying(!isPlaying)}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </span>
              <span
                className="group next-audio"
                title="Next track"
                onClick={() => {
                  if (index === files.length - 1) {
                    return;
                  }
                  setIndex(index + 1);
                }}
              >
                <NextIcon />
              </span>
            </span>
            <span className="group play-sounds">
              <span className="sounds-icon" onClick={() => setMuted(!isMuted)}>
                {isMuted ? <SpeakerOffIcon /> : <SpeakerOnIcon />}
              </span>
              <Slider
                value={isMuted ? 0 : volume}
                className="sound-operation"
                onChange={(v) => {
                  setVolume(v);
                  if (v === 0 && !isMuted) {
                    setMuted(true);
                  } else if (v > 0 && isMuted) {
                    setMuted(false);
                  }
                }}
                {...{ min: 0, max: 1, step: 0.01 }}
              />
            </span>

            <span className="group audio-lists-btn" title="Playlists">
              <span className="audio-lists-icon">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0H24V24H0z"></path>
                    <path d="M22 18v2H2v-2h20zM2 3.5l8 5-8 5v-10zM22 11v2H12v-2h10zm0-7v2H12V4h10z"></path>
                  </g>
                </svg>
              </span>
              <span className="audio-lists-num">1</span>
            </span>
            <span title="Destroy" className="group destroy-btn">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              </svg>
            </span>
          </div>
        </section>
      </div>
    </div>
    // document.body
  );
}
