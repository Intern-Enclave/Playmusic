import React from 'react';
import { useState} from 'react';


function usePausePlayClick(audioRef) {
    // audioRef = useRef();
    const [isPlay, setPlay] = useState(false);
    
    if (isPlay) {
        audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlay(!isPlay);
}

export default usePausePlayClick;