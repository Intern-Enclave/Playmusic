import Home from "../Page/Home"
import Album from "../Page/Album"
import NewSong from "../Page/NewSong"
import User from "../Page/User"
import Playlist from "../Page/Playlist"
import PlaylistId from "../Page/PlaylistId"

const publicRoute = [
    {path: '/', component: Home},
    {path: '/album', component: Album},
    {path: '/newsong', component: NewSong},
    {path: '/playlist', component: Playlist},
    {path: '/user', component: User},
    {path: '/playlist/playlist_id', component: PlaylistId},
]

const privateRoute = []

export {publicRoute, privateRoute}