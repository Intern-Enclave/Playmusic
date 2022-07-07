import React from 'react';
import Carousel from '../../component/carousel/Carousel';
import './home.scss';
import { AiFillPlayCircle, AiFillHeart  } from 'react-icons/ai';
import { BsHeadphones } from 'react-icons/bs';

import { useMusic } from '../../hooks/useMusic';

const Home = () => {

    const { listTrack} = useMusic();
    return (
        <div className='home-page-container'>
            <div className= "topic-music">
                <h3 className = "tittle">Topic to day</h3>
                <Carousel 
                     show = {2}
                     
                >
                { listTrack.slice(0,5).map(val => (
                    <div className = "topic-item carousel-item" key={val.id}>
                        <div style={{padding: 8}}>
                            <img  src={val.album?.cover_big} alt="placeholder" style={{width: '100%',  height: 250}} />
                        </div>
                    </div>
                )) }
                    
                </Carousel>
            </div>
            {/* {/ playlist /} */}
            <div className= "playlists-music">
                <h3 className = "tittle tt">Playlists</h3>
                {/* {/ <div className = "tittle tt">Playlists</div> /} */}
                <div className = "more mo">
                    <p>More</p>
                </div>
                    
                    <div className = "playlist-music-item i1">
                        <div className='description-view'>
                            <p>10.0 <BsHeadphones/></p>
                            <p>9k <AiFillHeart  /></p>
                            <div className='play-hov'>
                                <AiFillPlayCircle />
                            </div>
                        </div>
                    <div style={{padding: 8}}>
                            <img  src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/1/b/8/9/1b8958017b04a663eb8c093905dd4d85.jpg" alt="placeholder"  />
                        </div>
                            <p className='pl-title desc wrap' >bibibbibibibibibibibi</p>
                            <p className='pl-singer desc wrap' >k111111111111111111</p>
                    </div>
                    
                    
            </div>
            {/* {/ topmusic /} */}
            <div className= "top-music">
                <h3 className = "tittle ttt" >Top</h3>
                <div className = "more tmt">
                    <p>More</p>
                </div>
                 <div className='top-music-item ti1'> 
                    <div className='top-dsg' style={{padding: 8}}>
                        <img src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/1/b/8/9/1b8958017b04a663eb8c093905dd4d85.jpg" alt="placeholder" />
                        <div className='top-music-desc'>
                            <p className='top-music-title' >Tán gái 808</p>
                            <p className='top-music-singer'>Low G</p>
                            <p className='top-number '>#1</p>
                        </div>
                    </div>
                </div>
                <div className='top-music-item ti2'> 
                    <div className='top-dsg' style={{padding: 8}}>
                        <img src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/1/b/8/9/1b8958017b04a663eb8c093905dd4d85.jpg" alt="placeholder" />
                        <div className='top-music-desc'>
                            <p className='top-music-title' >Tán gái 808</p>
                            <p className='top-music-singer'>Low G</p>
                            <p className='top-number '>#1</p>
                        </div>
                    </div>x
                </div>
                <div className='top-music-item ti3'> 
                    <div className='top-dsg' style={{padding: 8}}>
                        <img src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/1/b/8/9/1b8958017b04a663eb8c093905dd4d85.jpg" alt="placeholder" />
                        <div className='top-music-desc'>
                            <p className='top-music-title'>Tán gái 808</p>
                            <p className='top-music-singer'>Low G</p>
                            <p className='top-number '>#1</p>
                        </div>
                    </div>
                </div>
              
            </div> 
        </div>
    );
};

export default Home;