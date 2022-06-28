import React, { createContext,useState } from "react";

const NextMusicContext = createContext();

const NextMusicProvider = ({ children }) => {
  const [audioIndex, setAudioIndex] = useState(0)
  return (
    <NextMusicContext.Provider value={audioIndex}>
      {children}
    </NextMusicContext.Provider>
  );
};

export {NextMusicContext, NextMusicProvider}
