import React, { useState, useEffect } from 'react';
import Button from '../../component/Button/Button';
import {AiOutlineEdit,AiOutlineSetting,AiOutlineClose} from "react-icons/ai"
import {RiLockPasswordLine} from "react-icons/ri"
import { useMusic } from "../../hooks/useMusic";
import UseApi from '../../API/UseApi';
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import "./user.scss"

const User = () => {

    const {currentUser,setCurrentUser} = useMusic();
    const [iinitialValues, setInitialValues] = useState();

    
    const initialValues = {username:currentUser?.username, fullName:currentUser?.fullName, birthday:currentUser?.birthday, 
        country: currentUser?.country,image: currentUser?.image, phone:currentUser?.phone, email:currentUser?.email};             

    const [formValues, setFormValues] = useState(initialValues);
    const [isSubmit, setIsSubmit] = useState(false);
    const [editRequest, setEditRequest] = useState(false);
    // const [avatar, setAvatar] = useState();

    useEffect(()=> {
        currentUser && setInitialValues({username:currentUser?.username, fullName:currentUser?.fullName, birthday:currentUser?.birthday, 
            country: currentUser?.country,image: currentUser?.image, phone:currentUser?.phone, email:currentUser?.email})
    },[currentUser])
    
    useEffect(()=> {
        iinitialValues && setFormValues(iinitialValues)
    },[iinitialValues])

    // console.log(iinitialValues)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // setFormErrors(validate(formValues));
        setIsSubmit(true);
    };


    const editInfo = async () => {
        try{ 
        const user = {username:currentUser?.username, fullName:formValues.fullName, birthday:formValues.birthday, country: formValues.country, image: formValues.image, phone:formValues.phone, email:formValues.email}
          const resp = await UseApi.updateInfoUser(user);
        //   setCurrentUser(resp)
        }catch (error) {
          console.log("error edit info: ", error);
        }
      }    

    const save = () => {
        editInfo();
        setEditRequest(false)
        setCurrentUser(formValues)
        console.log(currentUser)
    }

    const handleHideChangePass = () => {
        const modal = document.querySelector(".change-pass-box");
        modal.classList.remove("open");
      };
      const handleShowChangePass = () => {
        const modal = document.querySelector(".change-pass-box");
        modal.classList.add("open");
      };

    
    // const handleChangeAvatar = (e)=> {
    //     const file = e.target.files[0]  
    //     file.preview = URL.createObjectURL(file)
    //     setAvatar(file)
    // }
    
    // console.log(avatar)

    // const postAva = async () => {
    //     try{ 
    //       const temp = {file: avatar.preview, username: currentUser?.username};
    //       const resp = await UseApi.postAvatar(temp);
    //       console.log(resp)
    //     //   setPlaylistUser([...playlistUser, resp])
    //     }catch (error) {
    //       console.log("error post playlist: ", error);
    //     }
    //   }
     
    

    return (
        <div className='acount-setting-container'>
            {
            currentUser ? 
                (<div className='acount-setting-content'>
                    <div className='acount-setting-header'>
                        <h3>Acount Setting<AiOutlineSetting style={{marginLeft: 10}}/></h3>
                        <div className='change-accept' onClick={() => setEditRequest(true)}>
                            <AiOutlineEdit/>
                        </div>
                    </div>
                    <div className='acount-setting-active'>
                        <div className='change-info-input'>
                            <div className='change-user-name change-item'>
                            {/* <input 
                                type='file'
                                        onChange={handleChangeAvatar} 
                                    >
                                    </input> */}
                                <p className='info-one-dsg'>Full Name</p>
                                {editRequest ? 
                                    (<input className='change-user-name-input input-dsg' 
                                        name='fullName'
                                        id = "user-name-input"
                                        placeholder='default'
                                        value = {formValues.fullName}
                                        onChange={handleChange} 
                                    >
                                    </input>) :
                                    (<input className='change-user-name-input input-dsg' 
                                        name='fullName'
                                        id = "user-name-input"
                                        placeholder='default'
                                        value = {formValues.fullName}
                                        readOnly 
                                    >
                                    </input>)
                                }
                               
                            </div>
                            
                            <div className='change-user-phone change-item'>
                                <p className='info-one-dsg'>Email</p>
                                {editRequest ? (<input className='change-user-phone-input input-dsg' 
                                 name='email'
                                   placeholder='default'
                                   value={formValues.email}
                                   onChange={handleChange}
                                >
                                </input>) :
                                (<input className='change-user-phone-input input-dsg' 
                                 name='email'
                                   placeholder='default'
                                   value={formValues.email}
                                    readOnly
                                >
                                </input>)}
                            </div>
                            <div className='change-user-email change-item'>
                                <p className='info-one-dsg'>Country</p>
                                {editRequest ? (<input className='change-user-Email input-dsg' 
                                 name='country'
                                   placeholder='default'
                                   value={formValues.country}
                                   onChange={handleChange}
                                >
                                </input>) :
                                (<input className='change-user-Email input-dsg' 
                                 name='country'
                                   placeholder='default'
                                   value={formValues.country}
                                   readOnly
                                >
                                </input>)}
                            </div>

                            <div className='change-user-age change-item'>
                                <p className='info-one-dsg'>Birthday</p>
                               {editRequest ? (<input className='change-user-age input-dsg' 
                                  type="date"
                                    name='birthday'
                                    placeholder='default'
                                    value={formValues.birthday ? formValues.birthday : 'Null'}
                                    onChange={handleChange}
                                >
                                </input>) :
                                (<input className='change-user-age input-dsg' 
                                    type="date"
                                    name='birthday'
                                    placeholder='default'
                                    value={formValues.birthday ? formValues.birthday : 'Null'}
                                    readOnly
                                >
                                </input>)}
                            </div>
                            
                            <div className='change-user-pass ' onClick={handleShowChangePass}>
                                <a className=''> Change password!</a>
                            </div>
                        </div>
                        <div className='change-avatar change-item'>
                            <div className='change-avatar-img'>
                                <img src = {currentUser?.image}/>
                                {/* {avatar && <img src = {avatar.preview}/>} */}
                            </div>
                            <Button className={"change-avater-button"}>Change Avatar</Button>
                        </div>
                    </div>

                    {/* change password */}
                    <div className="change-pass-box">
                <div className="change-pass-box-header">
                    <h3>
                    Change Password
                    <RiLockPasswordLine style={{ marginLeft: 10 }} />
                    </h3>
                    <button
                    className="change-pass-box-close-btn"
                    onClick={handleHideChangePass}
                    >
                    <Tippy delay={[0, 200]} content="Close">
                    <div>
                        <AiOutlineClose />
                    </div>
                    </Tippy>
                    </button>
                </div>
                <div className="change-pass-box-container">
                    <div className="change-pass-box-input">
                    <div className="change-oldpass change-item">
                        <p className="info-one-dsg">Old password</p>
                        <input
                        className="change-old-pass-input input-dsg"
                        id="old-pass-input"
                        placeholder="Old password"
                        ></input>
                        
                    </div>

                    <div className="change-newpass change-item">
                        <p className="info-one-dsg">New password</p>
                        <input
                        className="change-newpass-input input-dsg"
                        id="newpass-input"
                        placeholder="New password"
                        ></input>
                        
                    </div>

                    <div className="change-confirmpass change-item">
                        <p className="info-one-dsg">Confirm new password</p>
                        <input
                        className="change-confirmpass-input input-dsg"
                        id="confirmpass-input"
                        placeholder="Confirm new password"
                        ></input>
                        
                    </div>
                    </div>
                    <div className="space"></div>
                </div>
                </div>
                    <div className='setting-acept-button' >
                        <button className={"accept-button"} onClick={save}>Save</button>
                    </div>
                </div>) : <div></div>
            }
            </div>
    );
};

export default User; 



