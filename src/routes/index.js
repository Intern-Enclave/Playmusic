import Home from "../Page/Home"
import Album from "../Page/Album"
import Playlist from "../Page/Playlist"
import User from "../Page/User"

const publicRoute = [
    {path: '/', component: Home},
    {path: '/album', component: Album},
    {path: '/playlist', component: Playlist},
    {path: '/user', component: User},
]

const privateRoute = []

export {publicRoute, privateRoute}