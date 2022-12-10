import { Link } from 'react-router-dom';
import "./landingPage.css";


function LandingPage() {
    return (
        <div className='landing-page'>
            <Link to="/home">
                <button className='button-home'>Home</button>
            </Link>
        </div>
    );
};

export default LandingPage;