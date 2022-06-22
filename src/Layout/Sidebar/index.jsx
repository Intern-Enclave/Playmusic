import Button from '../../component/Button/Button';
import Image from '../../component/Image';

import {useLocation} from 'react-router'

import { BiLogIn, BiLogOut } from 'react-icons/bi';

import './sidebar.scss'
import SidebarItem from './sidebar-item';

import { FaUserEdit } from 'react-icons/fa';
import { TbPlaylist } from 'react-icons/tb';

function Sidebar() {
    const {pathName} = useLocation()

    const sidebar = [
        {
            title: 'User',
            icon: <FaUserEdit />,
            path: '/User'
        },
        {
            title: 'Playlist',
            icon:<TbPlaylist/>,
            path: '/playlist'
        },
        
    ]

    const active = sidebar.findIndex(e=> e.path === pathName)
    return (
        <div className='sidebar'>
            <div className="user">
                <Image className='user-avatar' src = '' />
                <Button leftIcon={<BiLogIn/>} primary className={'user-login'}>Login</Button>
            </div>
            <ul className='bar'>
                {sidebar.map((item,index) => (
                    <li className={`${index===active ? 'active' : ''}`}>
                        <SidebarItem key={index} leftIcon={item.icon} >{item.title}</SidebarItem>
                    </li>
                ))}
            </ul>
            <div className='logout'><SidebarItem leftIcon={<BiLogOut/> } className='logout-item' >Log out</SidebarItem></div>
        </div>
    );
}

export default Sidebar;