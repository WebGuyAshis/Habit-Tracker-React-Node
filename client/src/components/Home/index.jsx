import FooterNav from "../FooterNav";
import HeaderNav from "../HeaderNav";
import { Checkbox } from 'antd';
import "./home.styles.css";

import { useSelector,useDispatch } from "react-redux";
import { incHabitTarget,decHabitTarget } from "../../actions";
import CreateTask from "../CreateTask";
const Home = () => {
    const myState = useSelector((state)=>state.changeHabitTarget)
    const dispatch = useDispatch();
    return (
        <div className="home-container">
            <div className="home-body">
                {/* Header Part */}
                <HeaderNav />

                {/* Home Content */}
                <div className="home-content">
                    <div className="wish-user">
                        <h2>Good Morning, Ashis!</h2>
                        <span className="todays-date">October 18th, 2023</span>
                    </div>

                    <div className="todays-stats-container">
                        <h4>Today's Stats</h4>
                        <div className="show-mini-stat"></div>
                    </div>

                    <div className="habits-list-container">
                        <h4>Today's Habits</h4>

                        <div className="habit-list">
                            {/* Individual habits */}
                            <div className="habit-list-items">
                                <div className="habit-data">
                                    <img className="habit-img" src="" alt="" />
                                    <div className="habit-detail">
                                        <h5>Habit Name</h5>
                                        <span>08:00AM</span>
                                    </div>
                                </div>
                                <div className="habit-target">
                                    <button className="increase-target-count" onClick={()=>{dispatch(incHabitTarget())}}>+</button>
                                    <span className="completed-target-value">{myState}</span>
                                    /
                                    <span className="total-target-value">5</span>
                                    <button className="decrease-target-count" onClick={()=>{dispatch(decHabitTarget())}}>-</button>
                                </div>
                                <Checkbox  className="habit-status"/>
                            </div>
                        </div>
                    </div>
                </div>
            {/* Create Task Box */}
            <CreateTask />
            </div>
            {/* Footer Part */}
            <FooterNav />
        </div>
    );
};

export default Home;
