import Home from "../Page/Home"
import Album from "../Page/Album"
import NewSong from "../Page/NewSong"
import User from "../Page/User"
import Playlist from "../Page/Playlist"
import PlaylistId from "../Page/PlaylistId"
import AlbumId from "../Page/AlbumId"
import Singer from "../Page/Singer"
import SingerId from "../Page/SingerId"
import Topmusic from "../Page/Topmusic"

const publicRoute = [
    {path: '/', component: Home},
    {path: '/album', component: Album},
    {path: '/album_id', component: AlbumId},
    {path: '/newsong', component: NewSong},
    {path: '/playlist', component: Playlist},
    {path: '/user', component: User},
    {path: '/playlist/playlist_id', component: PlaylistId},
    {path: '/singer', component: Singer},
    {path: '/singerId', component: SingerId},
    {path: '/topmusic', component: Topmusic},
]

const privateRoute = []

export {publicRoute, privateRoute}