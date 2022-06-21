import Home from "../Page/Home"
import Album from "../Page/Album"

const publicRoute = [
    {path: '/', component: Home},
    {path: '/album', component: Album},
]

const privateRoute = []

export {publicRoute, privateRoute}