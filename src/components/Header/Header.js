import logo from '../../imgs/logo.png'; 
import { MainDisplayType } from '../../utils/dataTypes';

export function Header(props){

    const handleCategoryChange = (type) => {
        props.handleChange(type);
    }

    return (
        <header>
            <HeaderTop></HeaderTop>
            <NavBar
                setCategory={handleCategoryChange}
                currentType={props.currentType}
            />
        </header>
    );
}

function HeaderTop(){
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
                        <LoginButton></LoginButton>
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
            <div className="btn btn-light btn-sm">
                <div className="header__top__right__auth">Login</div>
            </div>
            <div className="btn btn-light btn-sm">
                <div className="header__top__right__auth">Sign in</div>
            </div>
        </>
    );
}

function NavBar(props){

    const handleCatSelect = (type) => {
        console.log("On click NAVBAR " + type)
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
                                <li onClick={() => handleCatSelect(MainDisplayType.Anime)}><a className={(props.currentType == MainDisplayType.Anime) ? "nav-link active" : "nav-link"} href="#">ANIME</a></li>
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