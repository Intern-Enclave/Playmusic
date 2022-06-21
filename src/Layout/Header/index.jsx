import React from 'react';
import './header.scss'

import Search from '../../component/Search/Search';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 


function Header() {
    const currentUser = true;
    
    return (
        <div className='header'>
            <div className="inner">
                <Search />
                
                <div className="action">

                </div>
            </div>
        </div>
    );
}

export default Header;