import React from 'react';
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import {AiOutlineClose, AiOutlineLike, AiOutlineDislike, AiOutlineSend} from 'react-icons/ai';
import {BsReply} from 'react-icons/bs'
import "./comment.scss"
import { useMusic } from '../../hooks/useMusic';
import CommentItem from '../CommentIt';

const Comment = () => {
    const {ShowComment, setShowComment} = useMusic()
    return (
        <div className='overlay_comment'>
            <div className='comment-container'>
                <div className='comment-modal-content'>
                    <div className='content-header'>
                        <h3 >Comment</h3>
                        <div onClick={()=>setShowComment(false)}>
                            <Tippy delay={[0,200]} content='Close'
                            >
                                    {/* <button className='header-icon-close' >
                                        <AiOutlineClose />
                                    </button> */}
                                    <div className='header-icon-close'>
                                        <span><AiOutlineClose /></span>
                                    </div>
                            </Tippy>
                        </div>
            
                    </div>
                    <div className='comment-box'>
                        <div className='action'>
                            <p>2 comments</p>
                        </div>
                        <div className='comment-all-cmt'>
                            <CommentItem/>
                            <CommentItem/>
                            <CommentItem/>
                        </div>
                    </div>

                    <div className='comment-input-box'>
                        <div className='comment-input'>
                            <textarea className='comment-input-here scroll' placeholder='Type your comment'></textarea>
                        </div>
                        <div className='send-button'>Send  <span><AiOutlineSend/></span>                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;