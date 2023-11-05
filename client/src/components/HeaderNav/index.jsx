import './headerNav.styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear,faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import bellImg from '../../assets/images/bell.png'
import {Link} from 'react-router-dom';
import userImg from '../../assets/images/defaultUser.png'

const HeaderNav = () => {
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
                            <Link className='diag-links' to=''>
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
