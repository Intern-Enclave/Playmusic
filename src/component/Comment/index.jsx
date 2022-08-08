import React, {useEffect, useState} from 'react';
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import {AiOutlineClose, AiOutlineLike, AiOutlineDislike, AiOutlineSend} from 'react-icons/ai';

import {BsReply} from 'react-icons/bs'
import "./comment.scss"
import { useMusic } from '../../hooks/useMusic';
import UseApi from '../../API/UseApi';
import CommentItem from '../CommentIt';

const Comment = () => {
    const {ShowComment, setShowComment, currentSong, currentUser} = useMusic()

    const [listComment, setListComment] = useState([]);
    const [comment, setComment] = useState('');
    const [isFetchingData,setIsFetchingData] = useState(false);


    const getComment = async () => { 
        try {
          const response = await UseApi.getCommentTrack({trackId: currentSong?.id });
          setListComment(response);
          console.log(response[0].user.image);
        } catch (error) {
          console.log("error get comment: ", error);
        }finally{
          
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
      }


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
                            <p>{listComment.length} Comment </p>
                        </div>
                        <div className='comment-all-cmt'>
                            {listComment.map((val)=>
                                <CommentItem src={`http://172.16.75.26:8080/api/user/images/${val.user?.image}`} userName={val.user.username} content={val.content} like={val.likes} dislike={val.dislikes} key={val.id} time={val.createAt}/>
                            )}
                            {/* <CommentItem userName={'abc'} content={'bcd'} time={'5 day'}/>
                            <CommentItem/>
                            <CommentItem/> */}
                        </div>
                    </div>

                    <div className='comment-input-box'>
                        <div className='comment-input'>
                            <textarea 
                                className='comment-input-here scroll' 
                                placeholder='Type your comment'
                                onChange={(e)=> setComment(e.target.value)}
                            >
                            </textarea>
                        </div>
                        <div className='send-button' onClick={()=> postComment()}>Send  <span><AiOutlineSend/></span>                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;