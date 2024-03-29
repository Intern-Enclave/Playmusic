import React from 'react';
import Button from '../Button/Button';
import './register.scss'

import { useMusic } from '../../hooks/useMusic';
import { useEffect, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import UseApi from '../../API/UseApi';
import Toastmenu from '../Toast';


function Register() {
//login
    const {unRegisterRequest,listUser,setListUser,loginRequest,setIsFetchingData} = useMusic()
    const [List, setList] = useState([]);

    // const register = () => {
    //     unLoginRequest();
    //     registerRequest();
    // }

    
    let toastProperties = null;

    const handleShowToastMenu = type => {
      switch(type) {
        case 'success':
          toastProperties = {
            id: List.length + 1,
            tittle: "Success",
            description: "Saved Information",
            color: "#7200a1"
        }
        break;

        case 'pass-success':
          toastProperties = {
            id: List.length + 1,
            tittle: "Success",
            description: "Change password complete",
            color: "#7200a1"
        }
        break;

        default:
          toastProperties = [];
      }
      setList([...List ,toastProperties])
    }


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
        addUserr();
        unRegisterRequest();   
        // alert('success')    
        handleShowToastMenu("success"); 
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
        }
        if (!values.confirmPass) {
            errors.confirmPass = "Password confirm is required";
        } else if(values.password !== values.confirmPass){
            errors.confirmPass = "Password and password confirm are not the same";
        }
        return errors;

    };

    const addUserr = async () => {
        setIsFetchingData(true);
        try{ 
          const resp = await UseApi.postUser({username: formValues.username, password: formValues.password});
          console.log(resp)
            setListUser([...listUser, resp])
        }catch (error) {
          console.log("error post user: ", error);
        }finally{
            setIsFetchingData(false);
        }
      }

    // const register = () => {
    //     if(formErrors != {}){
    //         console.log('abc')
                
    //     }
    //     else{
    //         console.log('bcd')
    //     }

    // }

    const Login = () => {
        unRegisterRequest();
        loginRequest();
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
                            <span className="register__switch" onClick={()=> Login()}>Login</span>
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
                                    placeholder="confirm password"
                                    // value={password}
                                    onChange = {handleChange}
                                    value = {formValues.confirmPass}
                                />
                            </div>
                            <p>{formErrors.confirmPass}</p>
                        </div>
                            <div className="login-button">
                            {/* <div className="login-button" > */}
                                <Button primary className={'login-button-btn'}>Register</Button>
                            </div>
                            <Toastmenu toastlist={List} setList= {setList}/>
                        </div>
                </div>
                </form> 
            </div>
        </div>
        // <></>
    );
}



export default Register;