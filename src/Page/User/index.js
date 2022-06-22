import React from 'react';
import './user.css'

const User = () => {
    return (
        <div className="login-modal">
        <div className="login-table">
            <h2 className="login-title">Login</h2>
            <div className="loginbox">
                <div className="usename box">
                    <div className="usename_here">
                        <label><b>Username</b></label>
                    </div>
                    <input className= "input-usename input-ds" type="text" placeholder="Type your Username" name="uname" />
                </div>
                <div className="password box">
                    <div className="password_here">
                        <label><b>Password</b></label>
                    </div>
                    <input className= "input-password input-ds" type="password" placeholder="Type your Password" name="psw" />
                </div>
            </div>
            <div className="point">
                <button className= "login-button" type="submit">Login</button>
                <div className="cr_acount-button">
                    <a href="">Creat Acount ?</a>  
                </div>  
            </div>
        </div>




    </div>

    );
};

export default User; 