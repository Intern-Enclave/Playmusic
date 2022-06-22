import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import styles from'./button.modul.scss'
import './button.modul.scss'
import classNames from 'classnames/bind';


const cx = classNames.bind(styles)

function Button({to, href, primary = false, outline = false, small = false, large = false, transparent = false,
                rounded=false, disabled=false, text = false, children, className, leftIcon, rightIcon, onClick, ...passProps}) {

    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    }

    if(disabled){
        delete props.onClick;
    }

    if(to){
        props.to = to
        Comp = Link
    }else if(href){
        props.href = href
        Comp = 'a'
    }

    const classes = cx('wraper-button', {
        primary,
        outline,
        small,
        large,
        text,
        disabled,
        rounded,
        transparent,
        [className]: className,
    })

    return (
        <div className='btn'>
            <Comp className = {classes} {...props}>
                {leftIcon && <span className='icon'>{leftIcon}</span>}
                <span className='title'>{children}</span>
                {rightIcon && <span className='icon'>{rightIcon}</span>}
            </Comp>
        </div>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string, 
    primary: PropTypes.bool, 
    outline: PropTypes.bool, 
    text: PropTypes.bool,
    rounded: PropTypes.bool,
    small: PropTypes.bool, 
    disabled: PropTypes.bool,
    large: PropTypes.bool,  
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node, 
    onClick: PropTypes.func,
}

export default Button;