import React from 'react';
import Button from '../../component/Button/Button';
import Image from '../../component/Image';
import { Link } from 'react-router-dom';

import {useLocation} from 'react-router'
import './sidebar.scss'

import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { FaCompactDisc,FaMusic } from 'react-icons/fa';
import { TbPlaylist } from 'react-icons/tb';
import { BsBarChartFill } from 'react-icons/bs';


import { useMusic } from '../../hooks/useMusic';

function Sidebar() {


    const {currentUser, loginRequest, logoutRequest} = useMusic()

    const login = () =>{
        loginRequest()
    }
    const logout = () =>{
        logoutRequest()
    }

    const sidebar = [
        {
            title: 'Discovery',
            icon: <FaCompactDisc />,
            path: '/',
            current: false,
        },
        {
            title: 'New Songs',
            icon:<FaMusic/>,
            path: '/newsong',
            current: false
        },
        {
            title: 'Playlist',
            icon:<TbPlaylist/>,
            path: '/playlist',
            current: true,
        },
        {
            title: 'Chart',
            icon:<BsBarChartFill/>,
            path: '/topmusic',
            current: true,
        },



    ]

    const {pathname} = useLocation()
    const active = sidebar.findIndex(e=> e.path === pathname);
   
    return (
        <div className='sidebar'>
            <div className="user">
                <Link to='/user' className='user-link' onClick={()=> (!currentUser && loginRequest())}>
                    <Image className='user-avatar' src = {currentUser?.image} />
                </Link>
            <div className="user-name-sidebar">{currentUser ? currentUser.username : ''}</div>
            </div>  
            <ul className='bar'>
                {!currentUser ? 
                    (
                        sidebar.map((item,index) => 
                            ( !item.current &&
                                (<li key={index} className={`sidebar-item ${index===active ? 'active' : ''}`}>
                                    <Button transparent leftIcon={item.icon} to ={item.path} >{item.title}</Button>
                                </li>)                 
                            ))
                    ) : (
                        sidebar.map((item,index) =>                     
                            <li key={index} className={`sidebar-item ${index===active ? 'active' : ''}`}>
                                <Button transparent leftIcon={item.icon} to ={item.path} >{item.title}</Button>
                            </li>             
                        )
                    )               
                }

            </ul>
            <div className='logout'>{ currentUser ? (<Button transparent leftIcon={<BiLogOut/> } className='logout-item' onClick={logout} to={'/'} >Log out</Button>) :
                (<Button transparent leftIcon={<BiLogIn/>} className={'login-item'} onClick={login}>Login</Button>)
            }</div>
        </div>
    );
}

export default Sidebar; 