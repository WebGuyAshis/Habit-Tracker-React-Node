import './headerNav.styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear,faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import bellImg from '../../assets/images/bell.png'
import {Link, useNavigate} from 'react-router-dom';
import userImg from '../../assets/images/defaultUser.png'
import axios from 'axios';
import { logoutUser, setUserData } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import coin from '../../assets/images/coin.png'
const HeaderNav = () => {
    const showNotification = useSelector((state)=>state.showNotification);
    const activeUser = useSelector((state)=>state.userAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let baseUrl = "http://127.0.0.1:8080"
    console.log(activeUser, "Active User----------------------------------------------------------");
    
    const logOutUser = async(req,res)=>{
        console.log("Lets logout user");
        try {
            let response = await axios.get(`${baseUrl}/api/v1/user/sign-out`,{
                withCredentials:'include',
            });
            if(response.status===200){
                console.log("Successfully Logout!");
                showNotification('success','SuccessFully Logged Out!!','')
                navigate('/')
                // dispatch(setUserData(null))
            }
            
        } catch (error) {
            console.log("Internal Server Error!",error);
            showNotification('error','Logout Failed!!','')

        }        
    }
    useEffect(()=>{
        dispatch(logoutUser(logOutUser));

    },[])
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
                            {activeUser ? activeUser.name: "Fetching Data..."}
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

                <div className="user-totalCoins">
                    <img src={coin} alt="" className='nav-coins' />
                    {activeUser? activeUser.totalPoints:0}
                </div>
            </div>
        </div>
    )
}

export default HeaderNav;
