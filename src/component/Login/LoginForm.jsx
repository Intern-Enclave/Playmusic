import React from 'react';
import Button from '../Button/Button';
import './login.scss'

import { useMusic } from '../../hooks/useMusic';
import { useState } from 'react';

function LoginForm() {

    const {handleLogin} = useMusic()

    const [nameValue, setNameValue] = useState('')
    const [passValue, setPassValue] = useState('')

    // const handleChangeName = (e) =>{
    //     const nameVal = e.target.value
    //         setNameValue(nameVal)
    // }
    // const handleChangePass = (e) =>{
    //     const passVal = e.target.value
    //     // if(!passVal.startsWith(' ')){
    //         setPassValue(passVal)
    //     // }
    // }
    const login = () =>{
        handleLogin(nameValue, passValue)
    }
    

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
                                    onChange = {e => setNameValue(e.target.value)}
                                />
                            </div>
                           
                            <div className="register__group">
                                <input 
                                    type="password" 
                                    className="register__input" 
                                    placeholder="Input your password"
                                    // value={password}
                                    onChange = {e => setPassValue(e.target.value)}
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



export default LoginForm;