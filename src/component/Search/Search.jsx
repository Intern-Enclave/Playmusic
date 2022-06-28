import React, { useRef } from 'react';
import { useEffect, useState } from "react";
import useDebounce from '../../hooks/useDebounce';
// import {Link} from 'react-router-dom'
// import images from '../../assets/img';

import MediaItem from '../MediaItem'
import * as searchServices from '../../services/searchService';

import HeadlessTippy from '@tippyjs/react/headless';
import Wraper from '../Popper/Wraper';

import { VscLoading } from "react-icons/vsc";
import { MdClear } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";

import './search.scss';

function Search() {

    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(true)
    const [loadding, setLoading] = useState(false)

    const debounce = useDebounce(searchValue, 700)

    const inputRef = useRef()

    useEffect(() => {
        if(!debounce.trim()){
            setSearchResult([])
            return;
        }
        
        const fetchApi = async () => {
            setLoading(true)
            
            const result = await searchServices.search(debounce)
            setSearchResult(result)
            
            setLoading(false)
        }

        fetchApi();


    },[debounce])



    const handleClear = () => {
        setSearchValue('');
        setSearchResult([])
        inputRef.current.focus();
    }

    const handleHideResult = () =>{
        setShowResult(false)
    }

    const handleChange = (e) =>{
        const searchVal = e.target.value
        if(!searchVal.startsWith(' ')){
            setSearchValue(searchVal)
        }
    }

    return (
        <div className='search-wrap'> 
            {/* <div className='logo'>
                <Link>
                    <img src={images.logo} alt="" />
                </Link>
            </div> */}
            <HeadlessTippy 
                interactive
                visible = {showResult && searchResult.length>0}
                // visible
                render={attrs => (
                    <div className='search-result' tabIndex= '-1' {...attrs}>
                        <Wraper>
                            <h4 className="search-title">
                                Offer
                            </h4>
                            {searchResult?.map((result) => (
                                <MediaItem key={result.id} singer={result?.artist.name} SongName={result?.title} img={result?.artist.picture} className={'result-item'}/>
                            ))}
                        
                        </Wraper>
                    </div>
                )}
                onClickOutside = {handleHideResult}
            >
                <div className="search">
                    <input 
                        ref={inputRef}
                        value={searchValue}
                        placeholder="In put name song" 
                        spellCheck={false}
                        onChange = {handleChange}
                        onFocus = {() => setShowResult(true)}
                    />
                    {!!searchValue && !loadding &&  (
                        <button className="clear" onClick={handleClear}>
                            <MdClear />
                        </button>
                    )}

                    {loadding && <VscLoading className='loading'/>}

                    <button className="search-btn">
                        <BiSearchAlt2 onMouseDown={(e)=> e.preventDefault()} />
                    </button>
                </div>
            </HeadlessTippy>
         </div>
    );
}

export default Search;
