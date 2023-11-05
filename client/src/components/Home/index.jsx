import FooterNav from "../FooterNav";
import HeaderNav from "../HeaderNav";
import { Checkbox } from "antd";
import "./home.styles.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  userHabits,
  selectedHabitDetail,
  setUserData,
  fetchUserHabitsFunction,
} from "../../actions";
import CreateTask from "../CreateTask";
import axios from "axios";
// import { faL } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import noDataGif from "../../assets/images/noData.gif";
import studyImg from "../../assets/images/study.png";
import sportsImg from "../../assets/images/sports.png";
import workImg from "../../assets/images/work.png";

const Home = () => {
  const navigate = useNavigate();
  //   const myState = useSelector((state) => state.changeHabitTarget);

  const { createBoxState, myHabits, activeUser } = useSelector((state) => ({
    createBoxState: state.openDialogueBoxes,
    myHabits: state.userHabitData,
    activeUser: state.userAuth,
  }));
  // const myHabits = useSelector((state)=>state.userHabitData)
  const dispatch = useDispatch();

  //   const [activeUserData, setactiveUserData] = useState(null);
  let baseUrl = "http://localhost:8080";

  useEffect(() => {
    console.log("Checking Session!");
    checkSession();
  }, []);

  useEffect(() => {
    console.log("active data", activeUser);
    if (activeUser) {
      fetchUserHabits();
    }
  }, [activeUser]);

  const checkSession = async () => {
    try {
      const response = await axios.get(`${baseUrl}/protected-route`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log("User session exists.", response.data);
        // setactiveUserData(response.data);
        dispatch(setUserData(response.data));
      }
      if (response.status === 401) {
        console.log("User Session Expired!");
        // setactiveUserData(null);
        dispatch(setUserData(null));
      }
    } catch (error) {
      console.log("User session not found.");
      navigate("/");
      // Handle the case where the user is not authenticated or the session has expired.
    }
  };

  // checkSession();

  // const createBoxState = useSelector((state)=> state.openDialogueBoxes);
  // const myHabits  = useSelector((state)=>state.createHabit)

  //   console.log("My Habits Initially:", myHabits);
  console.log("Active User:", activeUser);

  function getCurrentFormattedDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString("default", { month: "long" });
    const year = currentDate.getFullYear();

    // Function to add ordinal suffix to day (e.g., 1st, 2nd, 3rd, 4th)
    const getDayWithOrdinal = (day) => {
      if (day >= 11 && day <= 13) {
        return day + "th";
      }
      switch (day % 10) {
        case 1:
          return day + "st";
        case 2:
          return day + "nd";
        case 3:
          return day + "rd";
        default:
          return day + "th";
      }
    };

    const formattedDate = `${getDayWithOrdinal(day)} ${month} ${year}`;
    return formattedDate;
  }
  const formattedDate = getCurrentFormattedDate();

  //   For Greet Fetching
  function getGreetingBasedOnTime() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    let greeting = "";
    if (currentHour >= 6 && currentHour < 12) {
      greeting = "Good Morning";
    } else if (currentHour >= 12 && currentHour < 16) {
      greeting = "Good Afternoon";
    } else if (currentHour >= 16 && currentHour < 22) {
      greeting = "Good Evening";
    } else {
      greeting = "Good Night";
    }

    return greeting;
  }
  const greeting = getGreetingBasedOnTime();

  const showHabitDetails = (habitId) => {
    let selectedHabit = myHabits.filter((habit) => habit._id === habitId);
    console.log("Selected Habit:", selectedHabit[0]);
    dispatch(selectedHabitDetail(selectedHabit[0]));

    navigate("/user/habit-detail");
  };

  // Fetching User HAbit List
  async function fetchUserHabits() {
    console.log("ACtive USer DAta++++++++++++++++", activeUser);
    try {
        console.log("Fetching Habits!!!!!!!!!!!!!!!!!!");
      let response = await axios.get(
        `${baseUrl}/api/v1/user/fetch_habits/${activeUser._id}`
      );

      if (response.status === 200) {
        // habits =
        console.log("Response data", response.data);
        dispatch(userHabits(response.data));

        
      }
      if(response.status === 500){
        console.log("Internal Server Error!");
      }
    } catch (error) {
      console.log("Error Fetching Habits!");
    }
  }

  useEffect(() => {
    createBoxState && dispatch(fetchUserHabitsFunction(fetchUserHabits));
  }, [createBoxState]);

  // setInterval(() => {
  //     console.log("MyHabit!!!", myHabits);
  // }, 10000);
  console.log("My Habits:", myHabits);
  return (
    <div className="home-container">
      <div className="home-body">
        {/* Header Part */}
        <HeaderNav />

        {/* Home Content */}
        <div className="home-content">
          <div className="wish-user">
            <h2>
              {greeting}, {activeUser ? activeUser.name : "Fetching Data..."}!
            </h2>
            <span className="todays-date">{formattedDate}</span>
          </div>

          <div className="todays-stats-container">
            <h4>Today's Stats</h4>
            <div className="show-mini-stat"></div>
          </div>

          <div className="habits-list-container">
            <h4>Today's Habits</h4>

            <div className="habit-list">
              {/* Individual habits */}
              {myHabits ? (
                myHabits.map((habit, index) => {
                  let imgSrc =
                    habit.habitCategory === "Sports"
                      ? sportsImg
                      : habit.habitCategory === "School"
                      ? studyImg
                      : workImg;
                  return (
                    <div
                      className="habit-list-items"
                      key={index}
                      onClick={() => {
                        showHabitDetails(habit._id);
                      }}
                    >
                      <div className="habit-data">
                        <img className="habit-img" src={imgSrc} alt="" />
                        <div className="habit-detail">
                          <h5>{habit.habitName}</h5>
                          <span>08:00AM</span>
                        </div>
                      </div>
                      <Checkbox className="habit-status" />
                    </div>
                  );
                })
              ) : (
                <div className="noData">
                  <img src={noDataGif} alt="" />
                  <h1> No Habits Found!</h1>
                </div>
              )}

              {/* <div className="habit-list-items">
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
                            </div> */}
            </div>
          </div>
        </div>
        {/* Create Task Box */}

        {/* <CreateTask /> */}
        {createBoxState && <CreateTask />}
      </div>
      {/* Footer Part */}
      <FooterNav />
    </div>
  );
};

export default Home;
