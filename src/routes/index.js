import Home from "../Page/Home"
import Album from "../Page/Album"
import NewSong from "../Page/NewSong"
import User from "../Page/User"

const publicRoute = [
    {path: '/', component: Home},
    {path: '/album', component: Album},
    {path: '/newsong', component: NewSong},
    {path: '/user', component: User},
]

const privateRoute = []

export {publicRoute, privateRoute}