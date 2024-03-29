import React, {useEffect, useState} from 'react';
import {AiOutlineClose, AiOutlineSend} from 'react-icons/ai';

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useMusic } from '../../hooks/useMusic';
import UseApi from '../../API/UseApi';
import CommentItem from '../CommentIt';
import apiConfig from '../../API/apiConfig';
import "./comment.scss";

const Comment = () => {
    const { setShowComment, currentSong, currentUser,isFetchingData, setIsFetchingData, loginRequest} = useMusic()

    const [listComment, setListComment] = useState([]);
    const [comment, setComment] = useState('');

    const getComment = async () => { 
        try {
          const response = await UseApi.getCommentTrack({trackId: currentSong?.id });
          setListComment(response);
        } catch (error) {
          console.log("error get comment: ", error);
        }
      };
      
      useEffect(() => {
        getComment();
      }, [isFetchingData, currentSong]);

    
      const postComment = async () => {
        setIsFetchingData(true)
        try{ 
            if(comment.trim() != '')
            {
                    const temp = {
                        track_id : currentSong?.id,
                        username : currentUser?.username,
                        content : comment
                };
                const resp = await UseApi.postCommentForTrack(temp);
                console.log(temp)
            }

       
        }catch (error) {
          console.log("error post comment: ", error);
        }
        finally{
          setIsFetchingData(false)
        }
       setComment("")
      }
      // scroll to botom of lasted comment
      const scrollToBot = () => {
        const element = document.querySelector(".comment-box");
        element.scrollTop = element.scrollHeight;
    }

    useEffect(
        () => scrollToBot())
    //text input value is space
    return (
        <div className='overlay_comment' onClick={()=>setShowComment(false)}>
            <div className='comment-container' onClick={(e) => e.stopPropagation()}>
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
                            <p>{listComment.length} Comment </p>
                        </div>
                        <div className='comment-all-cmt'>
                            {listComment.map((val)=>
                                <CommentItem src={`${apiConfig.baseUrl}user/images/${val.user?.image}`} 
                                    id={val.id}
                                    content={val.content} 
                                    like={val.likes} 
                                    dislike={val.dislikes} 
                                    time={val.createAt}
                                    key={val.id} 
                                    userName={val.user.username}
                                    // isLike={false}
                                />
                            )}
                        </div>
                    </div>

                    <div className='comment-input-box'>
                        <div className='comment-input'>
                            <textarea 
                                className='comment-input-here scroll' 
                                placeholder='Type your comment'
                                onChange={(e)=> setComment(e.target.value)}
                                value={comment}
                            >
                            </textarea>
                        </div>
                        <div className='send-button' onClick={()=> {!currentUser ? loginRequest() : postComment()}}>Send  <span><AiOutlineSend/></span>                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;