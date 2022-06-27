import React from 'react';

import Header from './Header';
import Sidebar from './Sidebar';
import PlayerControl from './PlayerControl';

import './layout.scss'

function Layout({children, data}) {
    return (
        <div>
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