import React,{ useState, useEffect } from 'react';
import './commentIt.scss'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {BsReply} from 'react-icons/bs'
import ReactTimeAgo from 'react-time-ago'
import Image from '../Image';
import TimeAgo from 'javascript-time-ago'
import { useMusic } from '../../hooks/useMusic';
import UseApi from '../../API/UseApi';

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'


TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)


const CommentItem = ({id,userName, time, content, like, dislike, src}) => {

    const { currentUser,isFetchingData, setIsFetchingData } = useMusic();
    const [isLike, setIslike] = useState(false);
    const [isDisLike, setIsDisklike] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    
    const postLike = async () => {
        setIsFetchingData(true)
        try{ 
            if(isLike)
            {
                const temp = {
                    comment_id: id,
                    username : currentUser?.username,
                    isLiked : false
                };
                const resp = await UseApi.postLikeForTrack(temp);
            }
            else{
                const temp = {
                    comment_id: id,
                    username :currentUser?.username,
                    isLiked : true,
                };
                const resp = await UseApi.postLikeForTrack(temp);
            }
       
        }catch (error) {
          console.log("error post like for track: ", error);
        }
        finally{
          setIsFetchingData(false);
        }
      }
    const postDisLike = async () => {
        setIsFetchingData(true)
        try{ 
            if(isDisLike)
            {
                const temp = {
                    comment_id: id,
                    username : currentUser?.username,
                    isDisliked : false
                };
                const resp = await UseApi.postLikeForTrack(temp);
                console.log(temp)
            }
            else{
                const temp = {
                    comment_id: id,
                    username : currentUser?.username,
                    isDisliked : true,
                };
                const resp = await UseApi.postLikeForTrack(temp);
            }
       
        }catch (error) {
          console.log("error post dislike for track: ", error);
        }
        finally{
          setIsFetchingData(false);
        }
      }

      const getIsLike = async () => {
        setIsLoading(true);
        try {
            const response = await UseApi.getLikeForTrack({username: currentUser?.username});
            response.map(val => {
                if(val.username == currentUser?.username && val.comment_id == id) {
                    setIslike(val.liked);
                    setIsDisklike(val.disliked);
                }
            })
        } catch (error) {
            console.log("error get Is like comment: ", error);
        }finally{
            setIsLoading(false);
        }
        };
      useEffect(() => {
        getIsLike();
    }, [isLike, isFetchingData]);

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
                        <div className={`commetn-react-item like ${isLike ? 'likeActive' : ''}`}>
                            <span onClick={()=>postLike()}>{like}<AiOutlineLike /></span>
                            
                        </div>
                        <div className= {`commetn-react-item dislie ${isDisLike ? 'likeActive' : ''}`}>
                            <span onClick={()=>postDisLike()}>{dislike}<AiOutlineDislike /></span>
                           
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