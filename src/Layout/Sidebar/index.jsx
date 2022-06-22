import React from 'react';
import Button from '../../component/Button/Button';
import Image from '../../component/Image';
import { Link } from 'react-router-dom';

import {useLocation} from 'react-router'
import './sidebar.scss'

import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { FaUserEdit } from 'react-icons/fa';
import { TbPlaylist } from 'react-icons/tb';

function Sidebar() {
    const currentUser = true
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

    const {pathname} = useLocation()
    const active = sidebar.findIndex(e=> e.path === pathname);

    return (
        <div className='sidebar'>
            <div className="user">
                <Link to='/user' className='user-link'>
                    <Image className='user-avatar' src = '' />
                </Link>
            </div>
            <ul className='bar'>
                {sidebar.map((item,index) => (
                    <li key={index} className={`sidebar-item ${index===active ? 'active' : ''}`}>
                        <Button transparent leftIcon={item.icon} to ={item.path} >{item.title}</Button>
                    </li>
                ))}
            </ul>
            <div className='logout'>{ currentUser ? (<Button transparent leftIcon={<BiLogOut/> } className='logout-item' >Log out</Button>) :
                (<Button transparent leftIcon={<BiLogIn/>} primary className={'user-login'}>Login</Button>)
            }</div>
        </div>
    );
}

export default Sidebar; 