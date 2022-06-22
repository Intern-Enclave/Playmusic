import React from 'react';
import PropTypes from 'prop-types';


function SidebarItem({to, href, children, className, leftIcon, onClick, ...passProps}) {

    return (
        <div className="sidebar-item">
            <div className={`wrapper-sidebar-item ${className}`}>
                {leftIcon && <span className='sidebar-item-icon'>{leftIcon}</span>}
                <span className='sidebar-item-title'>{children}</span>
            </div>
        </div>
    );
}

SidebarItem.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string, 
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    onClick: PropTypes.func,
};
export default SidebarItem;