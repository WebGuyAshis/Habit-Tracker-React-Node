import {Link} from 'react-router-dom'
import './overviewNav.styles.css'
const OverviewNav = ()=>{
    return(
        <div className="overview-nav">
            <div className="overview-nav-logo">
                Aacharan
            </div>
            <div className="overview-auth-btn">
                <Link className='overview-signin' to="/sign-in">Sign In</Link>
                <Link className='overview-signup' to="/sign-up">Sign Up</Link>
            </div>
        </div>
    )
}

export default OverviewNav;