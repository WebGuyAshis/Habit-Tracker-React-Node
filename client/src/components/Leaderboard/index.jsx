import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import crownGif from '../../assets/images/crown.gif';
import coin from '../../assets/images/coin.png'

import './leaderboard.styles.css'
import FooterNav from '../FooterNav';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Leaderboard = () => {
    const navigate = useNavigate();
    // const activeUser = useSelector((state)=>state.userAuth);
    let [leadData, setLeadData] = useState([]);

    let baseUrl = 'http://127.0.0.1:8080'
    const fetchUsersPoints = async()=>{
        try {
            let response = await axios.get(`${baseUrl}/api/v1/user/fetchUserPoints`)
            if(response.status === 200){
                console.log("User List!", response.data);
                setLeadData(response.data)
            }
        } catch (error) {
            console.log("Error Fetching Users");
        }
    }

    useEffect(()=>{
        fetchUsersPoints();
    },[])
    return (
        <div className="leaderboard-container">
            <div className="leaderboard-head">
                {/* Back Icon */}
                <FontAwesomeIcon className='leaderboard-icons' icon={faArrowLeft} onClick={()=>{
                    navigate(-1);
                }} />
                <h3>Leaderboard</h3>
                {/* Info Icon */}
                <FontAwesomeIcon className='leaderboard-icons show-info' icon={faCircleInfo} />
                <div className="info-details">
                    Complete Habits everyday to earn points. For every task done you will get 50 coins which will be used to evaluate your rank among all users!
                </div>
            </div>

            <div className="top-three-users">

                {leadData.length > 1 && (
                    <div className="rank2 sp-rank">
                    <img src="https://i.pinimg.com/originals/a5/a3/44/a5a3444e0a5bfc872efa334110fe3ed5.png" alt="" className='rank1-user-img' />
                    <p>{leadData.length > 0?leadData[1].name:"Fetching..."}({leadData.length > 0?leadData[1].totalPoints:"Fetching..."})</p>
                </div>
                )}
                <div className="rank1">
                    {/* <div className="user-img-crown"> */}
                    {/* Crown Icon */}
                    <img src={crownGif} alt="" className='rank1-user-crown' />
                    {/* User Image */}
                    <img src="https://i.pinimg.com/originals/a5/a3/44/a5a3444e0a5bfc872efa334110fe3ed5.png" alt="" className='rank1-user-img' />
                    <p>{leadData.length > 0?leadData[0].name:"Fetching..."}({leadData.length > 0?leadData[0].totalPoints:"Fetching..."})</p>
                    {/* </div> */}
                </div>
                {leadData.length > 2 && (
                    <div className="rank3 sp-rank">
                    <img src="https://i.pinimg.com/originals/a5/a3/44/a5a3444e0a5bfc872efa334110fe3ed5.png" alt="" className='rank1-user-img' />
                    <p>{leadData.length > 0?leadData[2].name:"Fetching..."}({leadData.length > 0?leadData[2].totalPoints:"Fetching..."})</p>
                </div>
                )}
            </div>

            <div className='user-rankings-count'>
                {leadData && leadData.map((data,index)=>{
                    console.log("Data:,",data);
                    return(
                        <div className="user-rankings-items" key={index}>
                    <div className="user-rank-details">
                        <span className="user-rank-count">
                            #{index + 1}
                        </span>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNEQwiv0MhrY2eqHPpdnIyIBZpdgL4hE6FRA&usqp=CAU" alt="" className='user-rank-img' />
                        <span className='user-rank-name'>{data.name}</span>
                    </div>
                    <div className="points-details">
                        <span className="points-count">
                            {data.totalPoints}
                        </span>
                        <img src={coin} alt="" className='points-icon' />
                    </div>
                </div>
                    )
                })}
                
            </div>


            <FooterNav />
        </div>
    )
}


export default Leaderboard;