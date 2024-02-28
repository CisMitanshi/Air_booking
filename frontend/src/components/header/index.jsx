import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './style.css'

const Header = () => {

    const location = useLocation();
    const showLoginButton = location.pathname !== "/login/";
    const showRegistrationButton = location.pathname !== "/register/";

    const userLoggedIn = localStorage.getItem("user");
    const nav = useNavigate()

    // function for logout 
    const logout = () =>{
        localStorage.setItem("user",[])
        nav('/login')
    }

    return (
        <>
            <header className="main_header_arae_two navbar_color_black">
                <div className="topbar-area">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-6">
                                <ul className="topbar-list">
                                    <li>
                                        <Link to="/" className="font-bold home" aria-current="page">Home</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-6 col-md-6">
                            { userLoggedIn?.length > 0 ?  <ul className="topbar-others-options"><li onClick={ logout }>Logout</li></ul> : <ul className="topbar-others-options">
                                    {showLoginButton && <li><Link to="/login">Login</Link></li>}
                                    {showRegistrationButton && <li><Link to="/register">SignUp</Link></li>}
                                </ul>  }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header