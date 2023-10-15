import "./signIn.styles.css";
// import authImg from "../../assets/images/auth.jpg";
import axios from "axios";
import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';

let baseUrl = "http://localhost:8080";

const SignIn = () => {
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
        signInformData
      );
      console.log("Response Status:", response.data, response.status === 200);
      if (response.status === 200) {
        console.log("Sign In Successfull!!", signInformData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        navigate('/user/home')
      }
    } catch (error) {
        if(error.response.status===404){
            console.log("Navigating to Sign Up Route!");
            navigate('/sign-up');
            return;
        }
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
      <div className="sign-up-logo">
        <span>Aacharan</span>
      </div>
        <div className="signin-body">
            <div className="signin-text">
            <h1>Welcome Back!</h1>
            <p>
            Track your way to a better you. Join us and start building healthier habits today
            </p>
            </div>
            <form
            className="form-data"
            action="/user/create-user"
            method="post"
            onSubmit={handleSignInFormSubmission}
            >
            {/* <div className="signin-name-field">

            <div className="signin-input-field">
              <label htmlFor="user-firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="user-firstName"
                placeholder="Enter your First Name"
                value={formData.firstName}
                onChange={handleInputChnage}
              />
            </div>

            <div className="signin-input-field">
              <label htmlFor="user-lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="user-lastName"
                placeholder="Enter your Last Name"
                value={formData.lastName}
                onChange={handleInputChnage}
              />
            </div>
          </div> */}

          <div className="signin-input-field">
            <label htmlFor="user-email">Email</label>
            <input
              type="email"
              name="email"
              id="user-signin-email"
              placeholder="Enter your Email"
              value={signInformData.email}
              onChange={handleSigninInputChange}
            />
          </div>

          <div className="signin-input-field">
            <label htmlFor="user-password">Password</label>
            <input
              type="password"
              name="password"
              id="user-signin-password"
              placeholder="Enter your password"
              value={signInformData.password}
              onChange={handleSigninInputChange}
            />
          </div>

          {/* <div className="signin-input-field">
            <label htmlFor="user-cnf-password">Confirm Password</label>
            <input
              type="password"
              name="cnfPassword"
              id="user-cnf-password"
              placeholder="Enter Confirm Password"
              value={formData.cnfPassword}
              onChange={handleInputChnage}
            />
          </div> */}

          {/* <div className="user-consent">
            <input type="checkbox"/>
            <p>Creating an account means you're okay with our<Link>Terms of Service, Privacy Policy</Link>, And our <Link>Default Notification Settings</Link>.</p>
          </div> */}

          <button id="sign-in-btn" type="submit">Sign In</button>
            </form>
        </div>
      {/* <div className="signin-page-image">
        <img src={authImg} alt="" />
      </div> */}
    </div>
  );
};

export default SignIn;
