import PropTypes from 'prop-types';
import React from 'react';
import Button from '../../Button/Button';
import './menu.modul.scss'

function MenuItems({data, onClick}) {
    // const sp = {separate: data.separate}
    // console.log
    const classes = `menu-item ${data.separate ? 'separate' : ''}`

    return (
        <Button className={classes} leftIcon={data.icon} to={data.to} onClick = {onClick}>{data.title}</Button>
    );
}

MenuItems.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
}

export default MenuItems;