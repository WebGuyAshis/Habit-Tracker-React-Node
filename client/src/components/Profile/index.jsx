import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRightFromBracket,
    faUser,
    faPalette,
    faFileLines,
    faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import "./profile.styles.css";
import userImg from "../../assets/images/defaultUser.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Profile = () => {
    const logoutFunc = useSelector((state)=>state.logoutUser)
    const activeUser = useSelector((state)=>state.userAuth);
    const navigate = useNavigate();

    if(logoutFunc){
        console.log("********", logoutFunc);
    }
    console.log("********************", logoutFunc);



    if(!activeUser){
        navigate('/');
        return null;
    }
    
    return (
        <div className="user-profile-container">
            {/* <div className="user-profile-background"></div> */}

            <div className="user-profile-details">
                <div className="user-profile-image">
                    {/* Img */}
                    <img src={userImg} alt="" />
                </div>
                <div className="user-profile-data">
                    <h2 className="user-profile-name">{activeUser.name}</h2>
                    <span className="user-profession">Student,Coding Ninjas</span>
                </div>

                <div className="user-profile-options">
                    <div className="profile-personal-data profile-btn">
                        {/* iCON */}
                        <FontAwesomeIcon icon={faUser} /> <span>Personal Data</span>
                    </div>
                    <div className="darkmode-btn profile-btn">
                        {/* Icon */}
                        <FontAwesomeIcon icon={faPalette} />
                        <span>Theme</span>
                    </div>
                    <div className="privacy-policy profile-btn">
                        {/* Icon  */}
                        <FontAwesomeIcon icon={faFileLines} />
                        <span>Privacy Policy</span>
                    </div>

                    <div className="contact-us profile-btn">
                        {/* Icon */}
                        <FontAwesomeIcon icon={faHeadset} />
                        <span>Contact Us</span>
                    </div>

                    <div className="user-profile-logout" onClick={()=>{logoutFunc()}}>
                        <span>Logout</span>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
