import "./signup.styles.css";
import signUpImg from '../../assets/images/signup.jpg'
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

let baseUrl = "http://localhost:8080";

const SignUp = () => {
  // handle form Submission
  let navigate = useNavigate();
  
  let [signupFormData, setsignupFormData] = useState({
    name: "",
    email: "",
    password: "",
    cnfPassword: "",
  });
  const handleFormSubmission = async (e) => {
    e.preventDefault();
    console.log("signupFormData:", signupFormData);

    try {
      let response = await axios.post(
        `${baseUrl}/api/v1/user/create-user`,
        signupFormData
      );
      console.log("Response Status:", response.data, response.status === 200);
      if (response.status === 200) {
        console.log("Form Submitted!", signupFormData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        navigate('/sign-in');
      }
    } catch (error) {
      if (error.response.status === 409) {
        console.log("Navigating to Sign In Route!");
        navigate('/sign-in');
        return;
      }
      console.log("Error Submitting Form!", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setsignupFormData({
      ...signupFormData,
      [name]: value,
    });
  };

  return (
    <div className="signUp-container">
      <div className="signup-img-container">
        <img src={signUpImg} alt="" className="signup-img" />
      </div>
      <div className="signup-body">
        <h1 className="signup-header">
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
        <form className="signup-form-data" onSubmit={handleFormSubmission}>

          <input type="text" id="signup-name" name="name" required placeholder="Enter your Name" onChange={handleInputChange}/>
          <input type="email" id="signup-email" name="email" required placeholder="Email" onChange={handleInputChange} />
          <input type="password" id="signup-password" name="password" required placeholder="Password" onChange={handleInputChange}/>
          <input type="password" id="signup-email" name="cnfPassword" required placeholder="Confirm Password" onChange={handleInputChange}/>
          <div className="redirect-signin">
            Already have an Account? <Link to="/sign-in">Sign In</Link>
          </div>
          <button type="submit" className="signup-submit">Create Account</button>
        </form>
      </div>

    </div>
  );
};

export default SignUp;
