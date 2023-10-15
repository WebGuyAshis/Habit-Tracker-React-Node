import "./signup.styles.css";
import authImg from "../../assets/images/auth.jpg";
import axios from "axios";
import { useState } from "react";
import {Link} from 'react-router-dom';

let baseUrl = "http://localhost:8080";

const SignUp = () => {
  // handle form Submission
  let [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cnfPassword: "",
  });
  const handleFormSubmission = async (e) => {
    e.preventDefault();
    console.log("FormData:", formData);

    try {
      let response = await axios.post(
        `${baseUrl}/api/v1/user/create-user`,
        formData
      );
      console.log("Response Status:", response.data, response.status === 200);
      if (response.status === 200) {
        console.log("Form Submitted!", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    } catch (error) {
      console.log("Error Submitting Form!", error);
    }
  };

  const handleInputChnage = (e) => {
    const { name, value } = e.target;

    setformData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="signUp-container">
      <div className="sign-up-logo">
        <span>Aacharan</span>
      </div>
        <div className="signup-body">
            <div className="signup-text">
            <h1>Let's Gets Started!</h1>
            <p>
            Track your way to a better you. Join us and start building healthier habits today
            </p>
            </div>
            <form
            className="form-data"
            action="/user/create-user"
            method="post"
            onSubmit={handleFormSubmission}
            >
            <div className="signup-name-field">

            <div className="signup-input-field">
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

            <div className="signup-input-field">
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
          </div>

          <div className="signup-input-field">
            <label htmlFor="user-email">Email</label>
            <input
              type="email"
              name="email"
              id="user-email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleInputChnage}
            />
          </div>

          <div className="signup-input-field">
            <label htmlFor="user-password">Password</label>
            <input
              type="password"
              name="password"
              id="user-password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChnage}
            />
          </div>

          <div className="signup-input-field">
            <label htmlFor="user-cnf-password">Confirm Password</label>
            <input
              type="password"
              name="cnfPassword"
              id="user-cnf-password"
              placeholder="Enter Confirm Password"
              value={formData.cnfPassword}
              onChange={handleInputChnage}
            />
          </div>

          <div className="user-consent">
            <input type="checkbox" />
            <p>Creating an account means you're okay with our<Link>Terms of Service, Privacy Policy</Link>, And our <Link>Default Notification Settings</Link>.</p>
          </div>

          <button id="sign-up-btn" type="submit">Create Your Account</button>
            </form>
        </div>
      {/* <div className="signup-page-image">
        <img src={authImg} alt="" />
      </div> */}
    </div>
  );
};

export default SignUp;
