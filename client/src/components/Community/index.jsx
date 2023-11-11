import "./community.styles.css";
import FooterNav from "../FooterNav/index.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Community = () => {
    const activeUser = useSelector((state) => state.userAuth);
    const navigate = useNavigate();
    const [isNewsActive, setIsNewsActive] = useState(true);
    const [statusData, setStatusData] = useState({
        status: "",
        userId: "",
    });
    const [allPosts, setAllPosts] = useState(null);

    const statusFormData = (e) => {
        setStatusData({
            ...statusData,
            status: e.target.value,
            userId: e.target.getAttribute("data-userid"),
        });
    };

    useEffect(() => {
        fetchPosts()
    }, []);

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

    let baseUrl = "http://127.0.0.1:8080";

    async function fetchPosts(){
        try {
            let response = await axios.get(`${baseUrl}/api/v1/user/fetchPosts`);
        if(response.status === 200){
            console.log("Feed Updated!", response.data);
            setAllPosts(response.data);
        }
        } catch (error) {
            console.log("Error While fetching Posts",error);
            setAllPosts(null)
        }
    }

    const savePost = async () => {
        try {
            let response = await axios.post(`${baseUrl}/api/v1/user/createPost`, statusData);
            if (response.status === 200) {
                console.log("Posted!", response.data);
                fetchPosts()
            } else if (response.status === 401) {
                console.log("User Session expired!");
                navigate("/");
            }
        } catch (error) {
            console.log("Error Posting", error);
        }
    };

    return (
        <div className="community-container">
            <div className="feed-msg-switch">
                <div
                    className={`newsfeed-sec community-toggler ${isNewsActive && "active-comm"
                        }`}
                    onClick={() => {
                        setIsNewsActive(true);
                    }}
                >
                    News Feed
                </div>
                <div
                    className={`msg-sec community-toggler ${!isNewsActive && "active-comm"
                        }`}
                    onClick={() => {
                        setIsNewsActive(false);
                    }}
                >
                    Messages
                </div>
            </div>
            <h1 className="news-feed-head">News Feed!</h1>
            <div className="community-welcome-note">
                <h2>{greeting} {activeUser && activeUser.name}!</h2>
                <span>Welcome to Community!</span>
                <div className="community-post-status">
                    <div className="user-img-cont">
                        <img
                            src="https://i.pinimg.com/550x/0c/d2/ce/0cd2ce58059ee1e3c0337458821dabf2.jpg"
                            alt=""
                            className="active-user-logo"
                        />
                    </div>
                    <textarea
                        data-userid={activeUser && activeUser._id}
                        className="comm-share-status"
                        value={statusData.status}
                        name=""
                        onChange={statusFormData}
                        placeholder="Post your daily achicevements!"
                    ></textarea>
                    {/* Post Icon */}
                    {/* <FontAwesomeIcon icon={faPaperPlane} className='post-btn'/> */}
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/9131/9131510.png"
                        alt=""
                        className="post-btn"
                        onClick={savePost}
                    />
                </div>
            </div>

            <div className="comm-allusers-post">
    <h2>Feeds </h2>
    {/* Each Post */}
    {allPosts ? (
        allPosts.map((post) => {
            return (
                <div className="allusers-post" key={post._id}>
                    <div className="postuser-details">
                        <img src="" alt="" />
                        <span>{post.userData.name}</span>
                        <div className="post-date-time">
                            12th Nov, 2023, 6hr ago
                        </div>
                    </div>
                    <div className="user-post-details">
                        {/* Im Glad to share with you guys Ive successfuly Compleated a habit today! */}
                        {post.postStatus}
                    </div>
                </div>
            );
        })
    ) : (
        <div className="allusers-post">
            Fetching Posts...
        </div>
    )}
</div>


            <FooterNav />
        </div>
    );
};

export default Community;
