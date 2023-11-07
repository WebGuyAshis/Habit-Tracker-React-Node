import './headerNav.styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear,faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import bellImg from '../../assets/images/bell.png'
import {Link} from 'react-router-dom';
import userImg from '../../assets/images/defaultUser.png'
import axios from 'axios';

const HeaderNav = () => {
    let baseUrl = "http://127.0.0.1:8080"
    const logOutUser = async(req,res)=>{
        console.log("Lets logout user");
        try {
            let response = await axios.get(`${baseUrl}/api/v1/user/sign-out`,{
                withCredentials:'include',
            });
            if(response.status===200){
                console.log("Successfully Logout!");
            }

        } catch (error) {
            console.log("Internal Server Error!",error);
        }        
    }
    return (
        <div className="headernav-container">
            <h3 className='logo'>HabitBuddy</h3>
            <div className="header-icons">

                <div className="user-img">
                    <img className='user-img-profile' src={userImg} alt="user" />

                    <div className="user-dialogue-box">
                        <div className="user-img-diag">
                            <img className='user-img-profile-diag' src={userImg} alt="user" />
                        </div>
                        <h3 className="user-diag-name">
                            Ashis
                        </h3>
                        
                        <div className="diag-options">
                            <Link className='diag-links' to=''>
                            <FontAwesomeIcon icon={faGear} />
                                Settings</Link>
                            <Link className='diag-links' to='/' onClick={logOutUser}>
                            <FontAwesomeIcon icon={faRightFromBracket} />
                                LogOut</Link>
                        </div>
                    </div>
                </div>

                <div className="bell-icon">
                    <div className="notification-count">
                        1
                    </div>
                    <img className='bell-img' src={bellImg} alt="" />
                </div>
            </div>
        </div>
    )
}

export default HeaderNav;
