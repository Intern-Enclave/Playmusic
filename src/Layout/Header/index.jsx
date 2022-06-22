import React from 'react';
import './header.scss'

import Search from '../../component/Search/Search';
function Header() { 
    // const currentUser
    
    return (
        <div className='header'>
            <Search />
        </div>
    );
}

export default Header;