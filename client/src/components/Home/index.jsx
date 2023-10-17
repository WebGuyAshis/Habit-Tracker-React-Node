import FooterNav from '../FooterNav';
import HeaderNav from '../HeaderNav';
import './home.styles.css'

const Home = ()=>{
    return(
        <div className="home-container">
            <div className="home-body">
            <HeaderNav/>

            <div className="home-content">

            </div>
            </div>
            <FooterNav/>
        </div>
    )
}

export default Home;