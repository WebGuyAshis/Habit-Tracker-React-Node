import "./signIn.styles.css";
import signinImg from '../../assets/images/signin.jpg'
import axios from "axios";
import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";

import { userLogin } from "../../actions";
// import { connect } from "mongoose";

let baseUrl = "http://localhost:8080";

const SignIn = () => {
  const dispatch = useDispatch()
  // handle form Submission
  let navigate = useNavigate();
  let [signInformData, setsignInformData] = useState({
    email: "",
    password: "",
  });
  const handleSignInFormSubmission = async (e) => {
    e.preventDefault();
    console.log("FormData:", signInformData);

    try {
      let response = await axios.post(
        `${baseUrl}/api/v1/user/create-session`,
        signInformData,
        {
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );
      
      console.log("Response Status:",response, response.data, response.status === 200);

      // Handling 200 response

      if (response.status === 200) {
        // test function

        function getCookie(name) {
          var cookieName = name + "=";
          var decodedCookie = decodeURIComponent(document.cookie);
          var cookieArray = decodedCookie.split(';');
          for (var i = 0; i < cookieArray.length; i++) {
              var cookie = cookieArray[i].trim();
              if (cookie.indexOf(cookieName) === 0) {
                  return cookie.substring(cookieName.length, cookie.length);
              }
          }
          return null;
      }

      console.log("GetCookie:", getCookie("connect.sid"), "Document.cookie:", document.cookie);

        // 
        console.log("Response:", response.headers.setAccept);
        console.log("React USER DATA:", response.data.userData);

        dispatch(userLogin(response.data.userData))
        console.log("Sign In Successfull!!", signInformData,   {
          headers: {
            "Content-Type": "application/json",
          },
        });
        navigate('/user/home')
      }
    } catch (error) {
        // if(error.response.status===404){
        //     console.log("Navigating to Sign Up Route!");
        //     navigate('/sign-up');
        //     return;
        // }
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
