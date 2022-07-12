import React from 'react';
import Carousel from '../../component/carousel/Carousel';
import './home.scss'
import { AiOutlinePlayCircle, AiOutlineHeart  } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


const Home = () => {
    return (
        <div className='home-page-container'>

            <div className= "topic-music">
                <h3 className = "topic tittle">Topic to day</h3>
                <Carousel 
                     show = {2}
                >
                    <div className = "topic-item carousel-item">
                    <div style={{padding: 8}}>
                            <img  src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/1/b/8/9/1b8958017b04a663eb8c093905dd4d85.jpg" alt="placeholder" style={{width: '100%',  height: 250}} />
                        </div>
                    </div>
                    <div className = "topic-item carousel-item">
                    <div style={{padding: 8}}>
                            <img  src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/1/b/8/9/1b8958017b04a663eb8c093905dd4d85.jpg" alt="placeholder" style={{width: '100%',  height: 250}} />
                        </div>
                    </div>
                    <div className = "topic-item carousel-item">
                    <div style={{padding: 8}}>
                            <img  src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/1/b/8/9/1b8958017b04a663eb8c093905dd4d85.jpg" alt="placeholder" style={{width: '100%',  height: 250}} />
                        </div>
                    </div>
                    
                </Carousel>
            </div>

     
            <div className= "playlists-music">
                <div className = "playlists-music-header">
                    <h3 className = "playlists tittle">Playlists</h3>
                    <p className='playlists-more more'>More</p>
                </div>
                <div className='playlists-music-box'>
                    <div className = "playlist-music-item">
                        <div className='playlist-music-item-img'>
                            <img  src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/1/b/8/9/1b8958017b04a663eb8c093905dd4d85.jpg" alt="placeholder">
                            </img> 
                            <div className='playlist-music-item-img-hov' >
                                <Tippy delay={[0,200]} content='Add to playlist'>
                                    <div className='hov-heart'><span><AiOutlineHeart/></span></div>
                                </Tippy>
                                <Tippy delay={[0,200]} content='Play'>
                                    <div className='hov-play'><span><AiOutlinePlayCircle/></span></div>
                                </Tippy>
                                <Tippy delay={[0,200]} content='More'>
                                    <div className='hov-more'><span><FiMoreHorizontal/></span></div>
                                </Tippy>
                            </div>
                        </div>    
                        <div className='playlist-music-item-desc'>
                            <p className='playlists-tittle' >Dui dẻ</p>
                            <p className='playlists-singer' >Ba gà</p>
                        </div>
                    </div>
                    
                    <div className = "playlist-music-item">
                        <div className='playlist-music-item-img'>
                            <img  src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/1/b/8/9/1b8958017b04a663eb8c093905dd4d85.jpg" alt="placeholder">
                            </img> 
                            <div className='playlist-music-item-img-hov' >
                                <Tippy delay={[0,200]} content='Add to playlist'>
                                    <div className='hov-heart'><span><AiOutlineHeart/></span></div>
                                </Tippy>
                                <Tippy delay={[0,200]} content='Play'>
                                    <div className='hov-play'><span><AiOutlinePlayCircle/></span></div>
                                </Tippy>
                                <Tippy delay={[0,200]} content='More'>
                                    <div className='hov-more'><span><FiMoreHorizontal/></span></div>
                                </Tippy>
                            </div>
                        </div>    
                        <div className='playlist-music-item-desc'>
                            <p className='playlists-tittle' >Dui dẻ</p>
                            <p className='playlists-singer' >Ba gà</p>
                        </div>
                    </div>

                    <div className = "playlist-music-item">
                        <div className='playlist-music-item-img'>
                            <img  src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/1/b/8/9/1b8958017b04a663eb8c093905dd4d85.jpg" alt="placeholder">
                            </img> 
                            <div className='playlist-music-item-img-hov' >
                                <Tippy delay={[0,200]} content='Add to playlist'>
                                    <div className='hov-heart'><span><AiOutlineHeart/></span></div>
                                </Tippy>
                                <Tippy delay={[0,200]} content='Play'>
                                    <div className='hov-play'><span><AiOutlinePlayCircle/></span></div>
                                </Tippy>
                                <Tippy delay={[0,200]} content='More'>
                                    <div className='hov-more'><span><FiMoreHorizontal/></span></div>
                                </Tippy>
                            </div>
                        </div>    
                        <div className='playlist-music-item-desc'>
                            <p className='playlists-tittle' >Dui dẻ</p>
                            <p className='playlists-singer' >Ba gà</p>
                        </div>
                    </div>

                    <div className = "playlist-music-item">
                        <div className='playlist-music-item-img'>
                            <img  src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/1/b/8/9/1b8958017b04a663eb8c093905dd4d85.jpg" alt="placeholder">
                            </img> 
                            <div className='playlist-music-item-img-hov' >
                                <Tippy delay={[0,200]} content='Add to playlist'>
                                    <div className='hov-heart'><span><AiOutlineHeart/></span></div>
                                </Tippy>
                                <Tippy delay={[0,200]} content='Play'>
                                    <div className='hov-play'><span><AiOutlinePlayCircle/></span></div>
                                </Tippy>
                                <Tippy delay={[0,200]} content='More'>
                                    <div className='hov-more'><span><FiMoreHorizontal/></span></div>
                                </Tippy>
                            </div>
                        </div>    
                        <div className='playlist-music-item-desc'>
                            <p className='playlists-tittle' >Dui dẻ</p>
                            <p className='playlists-singer' >Ba gà</p>
                        </div>
                    </div>

                    <div className = "playlist-music-item">
                        <div className='playlist-music-item-img'>
                            <img  src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/1/b/8/9/1b8958017b04a663eb8c093905dd4d85.jpg" alt="placeholder">
                            </img> 
                            <div className='playlist-music-item-img-hov' >
                                <Tippy delay={[0,200]} content='Add to playlist'>
                                    <div className='hov-heart'><span><AiOutlineHeart/></span></div>
                                </Tippy>
                                <Tippy delay={[0,200]} content='Play'>
                                    <div className='hov-play'><span><AiOutlinePlayCircle/></span></div>
                                </Tippy>
                                <Tippy delay={[0,200]} content='More'>
                                    <div className='hov-more'><span><FiMoreHorizontal/></span></div>
                                </Tippy>
                            </div>
                        </div>    
                        <div className='playlist-music-item-desc'>
                            <p className='playlists-tittle' >Dui dẻ</p>
                            <p className='playlists-singer' >Ba gà</p>
                        </div>
                    </div>
                </div>
            </div>

      
            <div className= "top-music">
                <div className = "top-music-header ">
                    <h3 className = "tops tittle">Top</h3>
                    <p className='tops-more more'>More</p>
                </div>
                <div className='top-music-box'>
                    <div className='top-music-item'>
                        <div className='top-music-item-content'>
                            <div className='top-music-item-img'>
                                <img  src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/1/b/8/9/1b8958017b04a663eb8c093905dd4d85.jpg" alt="placeholder">
                                </img>
                                <div className='top-music-item-img-hov' >
                                    <div className='hov-play'><span><AiOutlinePlayCircle/></span></div>
                                </div>
                            </div>
                            <div className='top-music-item-status'>
                                <div className='top-music-item-desc'>
                                    <p className='top-tittle' >Dui dẻ</p>
                                    <p className='top-singer' >Ba gà</p>
                                </div>
                                <div className='top-number'>#1</div>
                            </div>
                        </div>
                    </div>

                    <div className='top-music-item'>
                        <div className='top-music-item-content'>
                            <div className='top-music-item-img'>
                                <img  src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/1/b/8/9/1b8958017b04a663eb8c093905dd4d85.jpg" alt="placeholder">
                                </img>
                                <div className='top-music-item-img-hov' >
                                    <div className='hov-play'><span><AiOutlinePlayCircle/></span></div>
                                </div>
                            </div>
                            <div className='top-music-item-status'>
                                <div className='top-music-item-desc'>
                                    <p className='top-tittle' >Dui dẻ</p>
                                    <p className='top-singer' >Ba gà</p>
                                </div>
                                <div className='top-number'>#1</div>
                            </div>
                        </div>
                    </div>

                    <div className='top-music-item'>
                        <div className='top-music-item-content'>
                            <div className='top-music-item-img'>
                                <img  src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/1/b/8/9/1b8958017b04a663eb8c093905dd4d85.jpg" alt="placeholder">
                                </img>
                                <div className='top-music-item-img-hov' >
                                    <div className='hov-play'><span><AiOutlinePlayCircle/></span></div>
                                </div>
                            </div>
                            <div className='top-music-item-status'>
                                <div className='top-music-item-desc'>
                                    <p className='top-tittle' >Dui dẻ</p>
                                    <p className='top-singer' >Ba gà</p>
                                </div>
                                <div className='top-number'>#1</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
           
            

    );
};

export default Home;