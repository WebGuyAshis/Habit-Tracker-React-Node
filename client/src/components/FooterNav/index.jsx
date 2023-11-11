import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse,faChartSimple,faPlus,faUser,faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './footerNav.styles.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openCreateHabit } from '../../actions';
// import { ContextData } from '../../App';

const FooterNav = ()=>{
    const dispatch = useDispatch();
    // const {openCreateHabit,setOpenCreateHabit} = useContext(ContextData)
    
    return(
        <div className="footerNav-container">

            <Link to='/user/home' className="home footNav-item">
                <div className="footnav-icons footnav-icon-home">
                <FontAwesomeIcon icon={faHouse} />
                </div>
                <div className='footNav-item-text'>Home</div>
            </Link>

            <Link to="/user/stats" className="Stats footNav-item">
                <div className="footnav-icons footnav-icon-Stats">
                <FontAwesomeIcon icon={faChartSimple} />
                </div>
                <div className='footNav-item-text'>Stats</div>
            </Link>

            <div className="add footNav-item" onClick={()=>{dispatch(openCreateHabit())}}>
                <div className="footnav-icons footnav-icon-add">
                <FontAwesomeIcon icon={faPlus} />
                </div>
                <div className='footNav-item-text'>Add</div>
            </div>

            <Link to="/user/community" className="Community footNav-item">
                <div className="footnav-icons footnav-icon-Community">
                <FontAwesomeIcon icon={faUserGroup} />
                </div>
                <div className='footNav-item-text'>Community</div>
            </Link>

            <Link to="/user/profile" className="Profile footNav-item">
                <div className="footnav-icons footnav-icon-Profile">
                <FontAwesomeIcon icon={faUser} />
                </div>
                <div className='footNav-item-text'>Profile</div>
            </Link>

        </div>
    )
}

export default FooterNav;