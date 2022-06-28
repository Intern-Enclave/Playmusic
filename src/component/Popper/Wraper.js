import PropTypes from 'prop-types';
import React from 'react';
import './poper.modul.scss'

function Wraper({children, className}) {
    return (
        <div className={`wrapper-poper ${className}`}>
            {children}
        </div>

    );
}

Wraper.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
}

export default Wraper;