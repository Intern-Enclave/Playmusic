import React from 'react';
import './commentIt.scss'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {BsReply} from 'react-icons/bs'

const CommentItem = () => {
    return (
        <div className='comment-item'>
            <div className='comment-item-img'>
                <img src = "https://anhdep123.com/wp-content/uploads/2021/01/nhung-hinh-anh-hoang-hon-buon.jpg"></img>
            </div>
            <div className='comment-item-status'>
                <div className='use-name'>
                    Enimem
                    <span className='post-date'>3 days ago</span>
                </div>
                <div className='cmt-text'>Write something in this box bla bla bla bla bla bla bla bla bla 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</div>
                    <div className='comment-react'>
                        <div className='commetn-react-item like'>
                            <span>10<AiOutlineLike /></span>
                            
                        </div>
                        <div className='commetn-react-item dislie'>
                            <span >5<AiOutlineDislike /></span>
                           
                        </div>
                        <div className='commetn-react-item reply'>
                            <span >Reply<BsReply /></span>
                           
                        </div>
                    </div>
                </div>
        </div>

                        
    );
};

export default CommentItem;