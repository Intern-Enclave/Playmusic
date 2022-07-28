import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "../../component/Button/Button";
import {
  AiOutlineEdit,
  AiOutlineSetting,
  AiOutlineClose,
} from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useMusic } from "../../hooks/useMusic";
import Image from "../../component/Image";
import UseApi from "../../API/UseApi";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import "./user.scss";

const User = () => {
  const { currentUser, setIsFetchingData } = useMusic();
  const [iinitialValues, setInitialValues] = useState();

  const changepass = {pass: '', newpass:'', confirmPass:''};
  const [formchangepass, setFormchangepass] = useState(changepass);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [formValues, setFormValues] = useState({});
  const [editRequest, setEditRequest] = useState(false);

  useEffect(() => {
    currentUser &&
      setInitialValues({
        username: currentUser?.username,
        fullName: currentUser?.fullName,
        birthday: currentUser?.birthday,
        country: currentUser?.country,
        image: currentUser?.image,
        phone: currentUser?.phone,
        email: currentUser?.email,
      });
  }, [currentUser]);

  useEffect(() => {
    iinitialValues && setFormValues(iinitialValues);
  },[iinitialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormchangepass({...formchangepass, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formchangepass));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formchangepass);
      updatePass();
      // console.log(username);
      alert('success');
      handleHideChangePass();
    }
  }, [formErrors]);


  const editInfo = async () => {
    setIsFetchingData(true)
    try {
      const user = {
        username: currentUser?.username,
        fullName: formValues.fullName,
        birthday: formValues.birthday,
        country: formValues.country,
        image: formValues.image,
        phone: formValues.phone,
        email: formValues.email,
      };
      const resp = await UseApi.updateInfoUser(user);
    } catch (error) {
      console.log("error edit info: ", error);
    }finally{
      setIsFetchingData(false)
    }
  };

  const updatePass = async () => {
    setIsFetchingData(true)
    try{
        const temp = {username: currentUser?.username, new_password: formchangepass.newpass};
        const resp = await UseApi.updatePassword(temp)

        // setCurrentUser(localStorage.getItem("currentUser"));
        // setCurrentUser(temp)

        console.log(currentUser)
    }catch(error){
        console.log("error change password: ", error);
    }
    setIsFetchingData(false)
  }

  

  const save = () => {
    editInfo({
      username: currentUser?.username,
      fullName: formValues.fullName,
      birthday: formValues.birthday,
      country: formValues.country,
      image: formValues.image,
      phone: formValues.phone,
      email: formValues.email,
    });
    setEditRequest(false);
    // setCurrentUser(formValues);
    console.log(currentUser);
  };

  const handleHideChangePass = () => {
    const modal = document.querySelector(".change-pass-box");
    modal.classList.remove("open");
  };
  const handleShowChangePass = () => {
    const modal = document.querySelector(".change-pass-box");
    modal.classList.add("open");
  };

  const validate = (values) => {
    const errors = {};
    if (!values.pass) {
      errors.pass = "Password is required";
    } else if (values.pass != currentUser?.password) {
      errors.pass = `Invalid Pasword!`;
    }
    if (!values.newpass) {
      errors.newpass = "New Password is required";
    } else if (values.newpass.length < 4) {
      errors.newpass = "Password must be more than 4 characters";
    }
    if (!values.confirmPass) {
      errors.confirmPass = "Password confirm is required";
    } else if (values.newpass != values.confirmPass) {
      errors.confirmPass = `Password and password confirm are not the same`;
    }
    return errors;
  };

  const [data,setData] = useState({})

  let formData = new FormData();
  const onFileChange = (e)=>{
    console.log(e.target.files[0])
    if(e.target && e.target.files[0]){
      formData.append('file', e.target.files[0], 'avatar.png')
      console.log(formData.get('file'))
      setData(formData.get('file'))
    }
  }

  
  const submitFileData = async ()=>{
    try{ 
      console.log(JSON.stringify(data))
      const temp = {file: data, username: currentUser?.username}
      console.log(temp)
      const resp = await UseApi.uploadImage(data);
      
    }catch (error) {
      console.log("error upload_image: ", error);
    }finally{
    }
  }

  // const [selectedFile, setSelectedFile] = React.useState(null);

  // const handleSubmit2 = async (event) => {
  //   event.preventDefault()
  //   const formData = new FormData();
  //   formData.append("selectedFile", selectedFile);
  //   try {
  //     const response = await axios({
  //       method: "post",
  //       url: "http://172.16.75.26:8080/api/user/files/upload",
  //       data: formData,
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //   } catch(error) {
  //     console.log(error)
  //   }
  // }

  // const handleFileSelect = (event) => {
  //   setSelectedFile(event.target.files[0])
  // }

  return (
    <div className="acount-setting-container">
      {currentUser ? (
        <div className="acount-setting-content">
          <div className="acount-setting-header">
            <h3>
              Acount Setting
              <AiOutlineSetting style={{ marginLeft: 10 }} />
            </h3>

            
          </div>
          <div className="acount-setting-active">
            <div className="change-info-input">
              <div className="change-info-input-header">
                <div className="change-info-title">
                  <h1>User Information</h1>
                </div>
                <div className="change-accept-tooltip" onClick={() => setEditRequest(true)}>
                  <div className="change-icon"><AiOutlineEdit/></div>
                  <span className="tooltiptext">Open Edit</span>
                </div>
              </div>
              <div className="change-item">
                <p className="info-one-dsg">Full Name</p>
                {editRequest ? (
                  <input
                    className="input-dsg"
                    name="fullName"
                    id="user-name-input"
                    placeholder="default"
                    value={formValues.fullName}
                    onChange={handleChange}
                  ></input>
                ) : (
                  <input
                    className="input-dsg"
                    name="fullName"
                    id="user-name-input"
                    placeholder="default"
                    value={formValues.fullName}
                    readOnly
                  ></input>
                )}
              </div>

              <div className="change-item">
                <p className="info-one-dsg">Email</p>
                {editRequest ? (
                  <input
                    className="input-dsg"
                    name="email"
                    placeholder="default"
                    value={formValues.email}
                    onChange={handleChange}
                  ></input>
                ) : (
                  <input
                    className="input-dsg"
                    name="email"
                    placeholder="default"
                    value={formValues.email}
                    readOnly
                  ></input>
                )}
              </div>
              <div className="change-item">
                <p className="info-one-dsg">Country</p>
                {editRequest ? (
                  <input
                    className="input-dsg"
                    name="country"
                    placeholder="default"
                    value={formValues.country}
                    onChange={handleChange}
                  ></input>
                ) : (
                  <input
                    className="input-dsg"
                    name="country"
                    placeholder="default"
                    value={formValues.country}
                    readOnly
                  ></input>
                )}
              </div>

              <div className="change-item">
                <p className="info-one-dsg">Birthday</p>
                {editRequest ? (
                  <input
                    className="input-dsg"
                    type="date"
                    name="birthday"
                    placeholder="default"
                    value={formValues.birthday ? formValues.birthday : "Null"}
                    onChange={handleChange}
                  ></input>
                ) : (
                  <input
                    className="input-dsg"
                    type="date"
                    name="birthday"
                    placeholder="default"
                    value={formValues.birthday ? formValues.birthday : "Null"}
                    readOnly
                  ></input>
                )}
              </div>
              <div className="setting-acept-button">
                <div className="change-user-pass " onClick={handleShowChangePass}>
                  <a className=""> Do you want to change password?</a>
                </div>
                <button className={"accept-button"} onClick={save}>
                  Save
                </button>
              </div>
            </div>
            <div className="change-avatar change-item">
              <div className="change-avatar-img">
                <Image src = {currentUser?.image} />
              </div>
            {/* <form onSubmit={handleSubmit2}> 
              <input type="file" name="file_upload" onChange={handleFileSelect} />
              <input type="submit" value="Upload File" />
            </form> */}

              <Button className={"change-avatar-button"} onClick={submitFileData}>Change Avatar</Button>
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
            <form onSubmit={handleSubmit} className= 'change-pass'>
              <div className="change-pass-box-container">
                <div className="change-pass-box-input">
                  <div className="change-oldpass change-item">
                    <p className="info-one-dsg">Old password</p> 
                    <input
                      className="change-old-pass-input input-dsg"
                      type='password'
                      name="pass"
                      id="old-pass-input"
                      placeholder="Old password"
                      value={formchangepass.pass}
                      onChange = {handleChange}
                    ></input>
                  </div>
                  <p>{formErrors.pass}</p>

                  <div className="change-newpass change-item">
                    <p className="info-one-dsg">New password</p>
                    <input
                      className="change-newpass-input input-dsg"
                      type='password'
                      name="newpass"
                      id="newpass-input"
                      placeholder="New password"
                      value={formchangepass.newpass}
                      onChange = {handleChange}
                    ></input>
                  </div>
                  <p>{formErrors.newpass}</p>

                  <div className="change-confirmpass change-item">
                    <p className="info-one-dsg">Confirm new password</p>
                    <input
                      className="change-confirmpass-input input-dsg"
                      type='password'
                      name="confirmPass"
                      id="confirmpass-input"
                      placeholder="Confirm new password"
                      value={formchangepass.confirmPass}
                      onChange = {handleChange}
                    ></input>
                  </div>
                  <p>{formErrors.confirmPass}</p>

                </div>
                {/* <div className="space"></div> */}
              </div>
                <button className={"accept-button"}>change</button>
            </form>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default User;
