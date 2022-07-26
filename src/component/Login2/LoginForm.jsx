import React from 'react';
import Button from '../Button/Button';
import Toastmenu from '../Toast';
import './login.scss'

import { useMusic } from '../../hooks/useMusic';
import { useEffect, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';


function Login() {
//login
    const {handleLogin, unLoginRequest, registerRequest,loginFail,setLoginFail, setNotification} = useMusic()  
    //valid
    const initialValues = { username: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [List, setList] = useState([]);
    
    const login = () =>{
        handleLogin(formValues.username, formValues.password);
        // handleShowToastMenu();
    }

    const register = () => {
        unLoginRequest();
        registerRequest();
    }
    
    //toast
    let toastProperties = null;

    const handleShowToastMenu = () => {
        toastProperties = {
            id: 1,
            tittle: "Succes",
            description: "infomation"
        }

        setList([toastProperties])
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginFail(false);
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
        } 
        return errors;
    };

    return (
        <div className="modal">
            <div className="modal__overlay"></div>

            <div className="modal__body">
            
                <form action="" className="register" id="form-register" onSubmit={handleSubmit}>
                <div className="register">
                    <Link to={'/'}><AiFillCloseCircle onClick={unLoginRequest}/></Link>
                    <div className="register__container">
                        <div className="register__header">
                            <h3 className="register__heading">Login</h3>
                            <span className="register__switch" onClick={() => register()}>Register</span>
                        </div>

                        {loginFail && <div className="loginfail">
                            <h2 className="login_fail-message">Login failed! Invalid username or password</h2>
                        </div>}

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
                                    onChange = {handleChange}
                                    value = {formValues.password}
                                />
                            </div>
                            <p>{formErrors.password}</p>
                        </div>

                        <div className="register__aside">
                            <div className="register__help">
                                <a href="#" className="register__help-link register__help-forgot">forgot password</a>
                                <span className="register__help-separate"></span>
                            </div>
                        </div>

                        
                            <div className="login-button" onClick ={login}>
                                <Button primary className={'login-button-btn'}>Login</Button>
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



export default Login;