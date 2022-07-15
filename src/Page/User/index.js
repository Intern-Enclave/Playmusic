import React, { useState, useEffect } from 'react';
import Button from '../../component/Button/Button';
import {AiOutlineEdit,AiOutlineSetting} from "react-icons/ai"
import { useMusic } from "../../hooks/useMusic";
import UseApi from '../../API/UseApi';
import "./user.scss"

const User = () => {

    const {currentUser} = useMusic();
   
    const initialValues = {username:'Lamlbx123', fullName:currentUser?.fullName, birthday:currentUser?.birthday, 
        country: currentUser?.country,image: currentUser?.image, phone:currentUser?.phone, email:currentUser?.email};
    
    const [formValues, setFormValues] = useState(initialValues);
    const [isSubmit, setIsSubmit] = useState(false);
    const [editRequest, setEditRequest] = useState(false);


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
        }catch (error) {
          console.log("error edit info: ", error);
        }
      }    

    const save = () => {
        editInfo();
        setEditRequest(false)
    }

    return (
        <div className='acount-setting-container'>
            {
            currentUser ? 
                (<div className='acount-setting-content'>
                    <div className='acount-setting-header'>
                        <h3>Acount Setting<AiOutlineSetting style={{marginLeft: 10}}/></h3>
                    </div>
                    <div className='acount-setting-active'>
                        <div className='change-info-input'>
                            <div className='change-user-name change-item'>
                                <p className='info-one-dsg'>Full Name</p>
                                {editRequest ? 
                                    (<input className='change-user-name-input input-dsg' 
                                        name='fullName'
                                        id = "user-name-input"
                                        placeholder='New Full name'
                                        value = {formValues.fullName}
                                        onChange={handleChange} 
                                    >
                                    </input>) :
                                    (<input className='change-user-name-input input-dsg' 
                                        name='fullName'
                                        id = "user-name-input"
                                        placeholder='New Full name'
                                        value = {formValues.fullName}
                                        readOnly 
                                    >
                                    </input>)
                                }
                                <label htmlFor='user-name-input'className='abc' onClick={() => setEditRequest(true)}>
                                    <AiOutlineEdit/>
                                </label>
                            </div>
                            
                            <div className='change-user-phone change-item'>
                                <p className='info-one-dsg'>Email</p>
                                {editRequest ? (<input className='change-user-phone-input input-dsg' 
                                 name='email'
                                   placeholder='New Email'
                                   value={formValues.email}
                                   onChange={handleChange}
                                >
                                </input>) :
                                (<input className='change-user-phone-input input-dsg' 
                                 name='email'
                                   placeholder='New Email'
                                   value={formValues.email}
                                    readOnly
                                >
                                </input>)}
                            </div>
                            <div className='change-user-email change-item'>
                                <p className='info-one-dsg'>Country</p>
                                {editRequest ? (<input className='change-user-Email input-dsg' 
                                 name='country'
                                   placeholder='New country'
                                   value={formValues.country}
                                   onChange={handleChange}
                                >
                                </input>) :
                                (<input className='change-user-Email input-dsg' 
                                 name='country'
                                   placeholder='New country'
                                   value={formValues.country}
                                   readOnly
                                >
                                </input>)}
                            </div>

                            <div className='change-user-age change-item'>
                                <p className='info-one-dsg'>Birthday</p>
                               {editRequest ? (<input className='change-user-age input-dsg' 
                                    name='birthday'
                                    placeholder='New birthday0'
                                    value={formValues.birthday ? formValues.birthday : 'Null'}
                                    onChange={handleChange}
                                >
                                </input>) :
                                (<input className='change-user-age input-dsg' 
                                    name='birthday'
                                    placeholder='New birthday0'
                                    value={formValues.birthday ? formValues.birthday : 'Null'}
                                    readOnly
                                >
                                </input>)}
                            </div>
                            
                            <div className='change-user-pass '>
                                <a className=''> Change password!</a>
                            </div>
                        </div>
                        <div className='change-avatar change-item'>
                            <div className='change-avatar-img'>
                                <img src = {currentUser?.image}/>
                            </div>
                            <Button className={"change-avater-button"}>Change Avatar</Button>
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