import logo from '../../imgs/logo.png'; 

export function Header(){
    return (
        <header>
            <HeaderTop></HeaderTop>
            <NavBar></NavBar>
        </header>
    );
}

function HeaderTop(){
    return (
    <div className="header__top">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-6">
                    <div className="header__top__left">
                        kontakt: media-librex@email.com
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

function NavBar(){
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-3 ">
                    <div className="header__left">
                        <img src={logo} alt=""/>
                    </div>
                </div>
                <div className="col-lg-6 col-md-3" style={{textAlign: "center"}}>
                    <nav className="header__menu">
                        <ul>
                            <li><a className="nav-link active" href="#">MOVIES</a></li>
                            <li><a className="nav-link" href="#">TV SERIES</a></li>
                            <li><a className="nav-link" href="#">ANIME</a></li>
                            <li><a className="nav-link" href="#">MUSIC</a></li>
                            <li><a className="nav-link" href="#">BOOKS</a></li>
                        </ul>
                    </nav>
                </div>
                <div id="extras"className="col-lg-3 col-md-3" style={{textAlign: "right"}}>
                    <div className="header__right">EXTRA</div>
                </div>
            </div>
            <HamburgerMenu></HamburgerMenu>
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