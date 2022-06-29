import React, { useContext } from "react"
import { PlayingMusicContext, PlayingMusicProvider } from "../Context/PlayingMusicContext"

function useMusic(){
    return useContext(PlayingMusicContext)
}

export { useMusic }