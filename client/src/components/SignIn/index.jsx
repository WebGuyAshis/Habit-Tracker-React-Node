import "./signIn.styles.css";
import signinImg from '../../assets/images/signin.jpg'
import axios from "axios";
import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getConfig } from "../../config.js";

import { userLogin, userAction } from "../../actions";

const SignIn = () => {
  let baseUrl = getConfig();
  const dispatch = useDispatch()
  const showNotification = useSelector((state)=>state.showNotification);
  // handle form Submission
  let navigate = useNavigate();
  let [signInformData, setsignInformData] = useState({
    email: "",
    password: "",
  });
  const handleSignInFormSubmission = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post(`${baseUrl}/api/v1/user/create-session`, signInformData, {
        headers: {
          'Content-Type': 'application/json'
        },
        // withCredentials: 'include'
      });

    
      if (response.status === 200) {
        dispatch(userLogin(response.data.userData));
        console.log("Setting Data in Local Storage");
        localStorage.setItem('activeUser', JSON.stringify(response.data.userData));
        showNotification('success', `Welcome ${response.data.userData.name}!`, "Let's Complete your scheduled Habits!");
        navigate('/user/home');
        return;
      } else if (response.status === 401) {
        showNotification('error', "Oops! Something Went Wrong!", "Incorrect Username or Password!");
        return
      }
    } catch (error) {
      showNotification('error', "Oops! Something Went Wrong!", "Error Logging In Please retry or Check Internet!");
      console.log("Error Submitting Form!", error);
    }
    
  };

  const handleSigninInputChange = (e) => {
    const { name, value } = e.target;

    setsignInformData({
      ...signInformData,
      [name]: value,
    });
  };

  return (
    <div className="signin-container">
      <div className="signin-img-container">
        <img src={signinImg} alt="" className="signin-img" />
      </div>
      <div className="signin-body">
        <h1 className="signin-header">
          Let's gets Started!
        </h1>
        {/* Social Login */}
        <div className="additional-login-options">
          <div className="google">

          </div>
          <div className="facebook">

          </div>
          <div className="github">

          </div>
        </div>

        <span className="or">or</span>
        {/* Form */}
        <form className="signin-form-data" onSubmit={handleSignInFormSubmission}>

          <input type="email" id="signin-email" name="email" required placeholder="Email" onChange={handleSigninInputChange} />
          <input type="password" id="signin-password" name="password" required placeholder="Password" onChange={handleSigninInputChange}/>
          <div className="redirect-signin">
            Don't have an Account? <Link to="/sign-up">Create Account</Link>
          </div>
          <button type="submit" className="signin-submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
