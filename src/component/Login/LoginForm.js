const handleClickClose = () => {
    const modal = document.querySelector(".login-modal");
    modal.classList.remove("open");
}

const handleClickOpen = () => {
    const modal = document.querySelector(".login-modal");
    modal.classList.add("open");
}

return (
    <div>
        <button className='kkk' onClick={handleClickOpen}>bbbbbbbb</button>
        <div className="login-modal">
            <div className="login-table">
                <div className='login_header'>
                    <button className='close-button' onClick={handleClickClose}>X</button>
                    <p className="login-title">Login</p>
                </div>
                <p className='Hello'>Hello !!!</p>
                <div className="loginbox">
                    <div className="usename box">
                        <div className="usename_here">
                            <label htmlFor="usname"></label>
                        </div>
                        <input className= "input-usename input-ds" type="text" placeholder="User Name" name="uname" />
                    </div>
                    <div className="password box">
                        <div className="password_here">
                            <label htmlFor="psw"></label>
                        </div>
                        <input className= "input-password input-ds" type="password" placeholder="Password" name="psw" />
                    </div>
                </div>
                <div className="point">
                    <button className= "login-button" type="submit">Login</button>
                    <div className="cr_acount-button">
                        <a href="#">Creat Acount ?</a>  
                    </div>  
                </div>
            </div>
        </div>
    </div>
);
