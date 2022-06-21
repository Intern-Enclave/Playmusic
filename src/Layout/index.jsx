import React from 'react';

import Header from './Header';
import Sidebar from './Sidebar';
import PlayerControl from './PlayerControl';

import './layout.scss'

function Layout({children}) {
    return (
        <div>
            <div className="container">
                <Sidebar />
                
                <div className='wrapper'>
                    <Header />
                    <div className="content">
                        {children}
                    </div>
                </div>

            </div>
            <PlayerControl />
        </div>
    );
}

export default Layout;