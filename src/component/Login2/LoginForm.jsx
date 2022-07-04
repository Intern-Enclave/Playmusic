import React from 'react';
import Button from '../Button/Button';
import './login.scss'

import { useMusic } from '../../hooks/useMusic';
import { useEffect, useState } from 'react';

function Login() {
//login
    const {handleLogin} = useMusic()

    const [nameValue, setNameValue] = useState('')
    const [passValue, setPassValue] = useState('')

    
    const login = () =>{
        handleLogin(nameValue, passValue)
    }


    //valid
    const initialValues = { username: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        setPassValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(formValues);
        }
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.username) {
        errors.username = "Username is required!";
        }
        if (!values.email) {
        errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
        errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
        errors.password = "Password is required";
        } else if (values.password.length < 4) {
        errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
        errors.password = "Password cannot exceed more than 10 characters";
        }
        return errors;
    };

    

    return (
        <div className="modal">
            <div className="modal__overlay"></div>

            <div className="modal__body">

                <form action="" className="register" id="form-register">
                <div className="register">
                    <div className="register__container">
                        <div className="register__header">
                            <h3 className="register__heading">Login</h3>
                            <span className="register__switch">Register</span>
                        </div>

                        <div className="register__form">
                            <div className="register__group">
                                <input 
                                    type="text" 
                                    className="register__input" 
                                    placeholder="Input your username"                                    
                                    onChange = {handleChange}
                                    value = {formValues.username}
                                />
                            </div>
                           
                            <div className="register__group">
                                <input 
                                    type="password" 
                                    className="register__input" 
                                    placeholder="Input your password"
                                    // value={password}
                                    onChange = {handleChange}
                                    // value = {formValues.password}
                                />
                            </div>
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
                        </div>
                </div>
                </form> 
            </div>
            
        </div>
    );
}



export default Login;