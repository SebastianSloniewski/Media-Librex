import logo from '../../imgs/logo.png'; 
import { config } from '../../utils/config';
import { MainDisplayType } from '../../utils/dataTypes';
import {HiOutlineUserCircle} from "react-icons/hi";
import {AiOutlineLogout} from "react-icons/ai";
import {AiOutlineLogin} from "react-icons/ai";
import {FaSignInAlt} from "react-icons/fa";
export function Header(props){

    const handleCategoryChange = (type) => {
        props.handleChange(type);
    }

    return (
        <header>
            <HeaderTop
                currentUser={props.currentUser}
                handleSwitchToUser={props.handleSwitchToUser}
                handleLogout={props.handleLogout}
            />
            <NavBar
                setCategory={handleCategoryChange}
                currentType={props.currentType}
            />
        </header>
    );
}

function HeaderTop(props){
    return (
    <div className="header__top">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-6 col-md-6">
                    <div className='header__top__left'>
                        media-librex@email.com
                    </div>
                </div>
                <div className="col-lg-6 col-md-6">
                    <div className="header__top__right">
                        {props.currentUser !== undefined ? 
                        <SignedPanel 
                            userName={props.currentUser.login}
                            handleSwitchToUser={props.handleSwitchToUser}
                            handleLogout={props.handleLogout}
                        /> 
                        : 
                        <LoginButton />}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

function LoginButton(){
    
    return(
        <>
            <div style={{display: 'flex', justifyContent: "right"}}>
                <div style={{flex: "5"}}></div>
                <a href={config.backendURL+"login"}>
                    <div  className="logButton">
                        <AiOutlineLogin  
                            size={25}>
                        </AiOutlineLogin>
                        <span style={{display: "block"}}><b>LogIn</b></span>
                    </div>
                    
                </a>

                <a href={config.backendURL+"register"}>
                    <div  className="logButton">
                        <FaSignInAlt 
                            size={25}>
                        </FaSignInAlt>
                        <span style={{display: "block"}}><b>SignUp</b></span>
                    </div>
                </a>
            </div>
            

        </>
    );
}




const SignedPanel = (props) => {
    return (
        <div style={{display: 'flex', justifyContent: "right"}}>
            <p style = {{marginTop: "20px"}}>Zalogowano jako <b>{props.userName}</b></p>
            <div  className="logButton">
                <HiOutlineUserCircle 
                    size={25}
                    onClick={props.handleSwitchToUser}
                />
                <span style={{display: "block"}}><b>User</b></span>
            </div>

            <div  className="logButton">
                <AiOutlineLogout 
                    size={25} 
                    onClick={props.handleLogout}
                />
                <span style={{display: "block"}}><b>LogOut</b></span>
            </div>
        </div>
    )

}

function NavBar(props){

    const handleCatSelect = (type) => {
        //console.log("On click NAVBAR " + type)
        props.setCategory(type);
    }


    return (
        <div className='header__nav'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-md-3 ">
                        <div className="header__left">
                            <img src={logo} alt=""/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-3" style={{textAlign: "center"}}>
                        <nav className="header__menu">
                            <ul>
                                <li onClick={() => handleCatSelect(MainDisplayType.Movies)}><a className={(props.currentType == MainDisplayType.Movies) ? "nav-link active" : "nav-link"} href="#">MOVIES</a></li>
                                <li onClick={() => handleCatSelect(MainDisplayType.TvSeries)}><a className={(props.currentType == MainDisplayType.TvSeries) ? "nav-link active" : "nav-link"} href="#">TV SERIES</a></li>
                                {/* <li onClick={() => handleCatSelect(MainDisplayType.Anime)}><a className={(props.currentType == MainDisplayType.Anime) ? "nav-link active" : "nav-link"} href="#">ANIME</a></li> */}
                                <li onClick={() => handleCatSelect(MainDisplayType.Music)}><a className={(props.currentType == MainDisplayType.Music) ? "nav-link active" : "nav-link"} href="#">MUSIC</a></li>
                                <li onClick={() => handleCatSelect(MainDisplayType.Books)}><a className={(props.currentType == MainDisplayType.Books) ? "nav-link active" : "nav-link"} href="#">BOOKS</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div id="extras"className="col-lg-3 col-md-3" style={{textAlign: "right"}}>
                        <div className="header__right">EXTRA</div>
                    </div>
                </div>
                <HamburgerMenu></HamburgerMenu>
            </div>
        </div>
    );
}

function HamburgerMenu(){
    return(
        <div className="hamburger__menu">
            <i className="fa fa-bars"></i>
        </div>
    );
}

export default Header;