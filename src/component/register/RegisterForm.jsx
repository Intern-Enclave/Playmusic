import React from 'react';
import Button from '../Button/Button';
import './register.scss'

import { useMusic } from '../../hooks/useMusic';
import { useEffect, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import UseApi from '../../API/UseApi';


function Register() {
//login
    const {unRegisterRequest} = useMusic()

    // const register = () => {
    //     unLoginRequest();
    //     registerRequest();
    // }


    //valid
    const initialValues = { username: "", password: "", confirmPass: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(formValues);
        }
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};
        // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.username) {
        errors.username = "Username is required!";
        }
        // if (!values.email) {
        // errors.email = "Email is required!";
        // } else if (!regex.test(values.email)) {
        // errors.email = "This is not a valid email format!";
        // }
        if (!values.password) {
        errors.password = "Password is required";
        } else if (values.password.length < 4) {
        errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
        errors.password = "Password cannot exceed more than 10 characters";
        }
        if (!values.confirmPass) {
            errors.confirmPass = "Password confirm is required";
        } else if(values.password !== values.confirmPass){
            errors.confirmPass = "Password and password confirm are not the same";
        }
        return errors;

    };

    const addUserr = async () => {
        try{ 
          const resp = await UseApi.postUser({username: formValues.username, password: formValues.password});
          console.log(resp)
        }catch (error) {
          console.log("error post user: ", error);
        }
      }

    const register = () => {
            addUserr();
            unRegisterRequest()
       
    }
    

    return (
        <div className="modal">
            <div className="modal__overlay"></div>

            <div className="modal__body">

            {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
                <div className="ui message success">Signed in successfully</div>
            ) : (
                <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
            )}
 */}

                <form action="" className="register" id="form-login" onSubmit={handleSubmit}>
                <div className="register">
                    <AiFillCloseCircle onClick={unRegisterRequest}/>
                    <div className="register__container">
                        <div className="register__header">
                            <h3 className="register__heading">Register</h3>
                            <span className="register__switch">Login</span>
                        </div>

                        <div className="register__form">
                            <div className="register__group">
                                <input 
                                    type="text" 
                                    name='username'
                                    className="register__input" 
                                    placeholder="Input your username"                                    
                                    onChange = {handleChange}
                                    value = {formValues.username}
                                />
                            </div>
                            <p>{formErrors.username}</p>
                           
                            <div className="register__group">
                                <input 
                                    type="password" 
                                    name='password'
                                    className="register__input" 
                                    placeholder="Input your password"
                                    // value={password}
                                    onChange = {handleChange}
                                    value = {formValues.password}
                                />
                            </div>
                            <p>{formErrors.password}</p>

                            <div className="register__group">
                                <input 
                                    type="password" 
                                    name='confirmPass'
                                    className="register__input" 
                                    placeholder="Input your password"
                                    // value={password}
                                    onChange = {handleChange}
                                    value = {formValues.confirmPass}
                                />
                            </div>
                            <p>{formErrors.confirmPass}</p>
                        </div>
                            <div className="login-button" onClick={()=> register()}>
                                <Button primary className={'login-button-btn'}>Register</Button>
                            </div>
                        </div>
                </div>
                </form> 
            </div>
        </div>
        // <></>
    );
}



export default Register;