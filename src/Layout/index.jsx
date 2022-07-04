import React from 'react';

import Header from './Header';
import Sidebar from './Sidebar';
import PlayerControl from './PlayerControl';
import LoginForm from '../component/Login/LoginForm';

import { useMusic } from '../hooks/useMusic';

import './layout.scss'

function Layout({children, data}) {
    const {currentUser, login} = useMusic()
    return (
        <div>
            
                {(!currentUser && login) && <LoginForm />} 
                <div className="main">
                    <Sidebar />
                    
                    <div className='wrapper'>
                        <Header />
                        <div className="content">
                            {children}
                        </div>
                    </div>
    
                </div>
                <PlayerControl data={data} />
            </div>

    );
}

export default Layout;