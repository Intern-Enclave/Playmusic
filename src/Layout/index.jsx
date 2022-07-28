import React from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import PlayerControl from "./PlayerControl";
import Login from "../component/Login2/LoginForm";
import Register from "../component/register/RegisterForm";
import Toastmenu from "../component/Toast";

import { useMusic } from "../hooks/useMusic";

import "./layout.scss";

function Layout({ children, data }) {
  const { currentUser, login, registerRq, setNotification, notification } =
    useMusic();
  return (
    <div>
        {notification && <Toastmenu toastlist={notification} setList={setNotification} />}
      {!currentUser && login && <Login />}
      {registerRq && <Register />}
      <div className="main">
        <Sidebar />

        <div className="wrapper">
          <Header />
          <div className="content">{children}</div>
        </div>
      </div>
      <PlayerControl data={data} />
    </div>
  );
}

export default Layout;
