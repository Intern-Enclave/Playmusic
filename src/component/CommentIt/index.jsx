import React from 'react';
import './commentIt.scss'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {BsReply} from 'react-icons/bs'
import ReactTimeAgo from 'react-time-ago'
import Image from '../Image';
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)


const CommentItem = ({userName, time, content, like, dislike, src}) => {
    return (
        <div className='comment-item'>
            <div className='comment-item-img'>
                <Image src={src} />
            </div>
            <div className='comment-item-status'>
                <div className='use-name'>
                    {userName}
                    <span className='post-date'>{<ReactTimeAgo date={time} locale="en-US"/>}</span>
                </div>
                <div className='cmt-text'>{content}</div>
                    <div className='comment-react'>
                        <div className='commetn-react-item like'>
                            <span>{like}<AiOutlineLike /></span>
                            
                        </div>
                        <div className='commetn-react-item dislie'>
                            <span >{dislike}<AiOutlineDislike /></span>
                           
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