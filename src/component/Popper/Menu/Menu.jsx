import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {Wraper as PoperWraper} from '..';
import Tippy from '@tippyjs/react/headless';
import './menu.modul.scss'
import MenuItems from './MenuItems';
import HeaderMenu from './HeaderMenu';

const defaultFn = ()=>{}

function Menu({children, hideOnClick = false, items = [], onChange = defaultFn()}) {

    const [history, setHistory] = useState([{data: items}])
    const current = history[history.length-1]

    const renderItems = () => {
        return current.data.map( (item,index) => {

            const isParent = !!item.children
            return <MenuItems key={index}  data = {item} onClick={() => {
                if(isParent){
                    setHistory(prev => [...prev, item.children])
                }else{
                    onChange(item)
                }
            }} />
        })
    }

    return (
        <Tippy 
            // visible 
            interactive
            delay={[10, 500]}
            offset = {[16,10]}
            hideOnClick = {hideOnClick}
            placement="bottom-end"
            render={attrs => (
                <div className='menu-content' tabIndex= '-1' {...attrs}>
                    <PoperWraper className={'menu-poper'}>
                        {history.length>1 && (
                            <HeaderMenu 
                                title={current.title} 
                                onBack={() => setHistory((prev) => prev.slice(0, prev.length-1))}
                            />
                        )}
                        <div className='menu-body'>{renderItems()}</div>
                    </PoperWraper>
                </div>
            )}
            onHidden = {()=>setHistory((prev) => prev.slice(0,1))}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    itemm : PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
}

export default Menu;