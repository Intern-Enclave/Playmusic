import React, { createContext,useState } from "react";

const PlayingMusicContext = createContext();

const PlayingMusicProvider = ({ children }) => {
  const [isPlay, setIsPlay] = useState(false);
  const togglePlay = () => {
    setIsPlay(!isPlay);
  };
  const value = {
    isPlay,
    togglePlay,
  };
  return (
    <PlayingMusicContext.Provider value={value}>
      {children}
    </PlayingMusicContext.Provider>
  );
};

export {PlayingMusicContext, PlayingMusicProvider}
