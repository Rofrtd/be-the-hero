import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";

export default class Home extends React.Component {
    render() {
      return <>
        <div className="home-container">
            <header>
                <img className="logo-home" src={logoImg} alt="Be the Hero" />
                <div className="user-container">
                    <Link className="button user-btn" to="/login">
                    Login
                    </Link>
                    <Link className="button user-btn" to="/register">
                    Signup
                    </Link>
                </div>
            </header>    
        </div>
        <div className="banner-container">
        <div className="banner-text">
        <h1 className="text-title">About Us</h1>
        <p>We're a non profit platform created in order to help those in need.
        This platform goal is to address all the needs in only one place to be easier to help or get help.</p>
        <br></br>
        <h1 className="text-title">How it works?</h1>
        <ol>
        <li>Those in need are encouraged to signup and enter their needs at register new case Section, also will be requested some personal information.</li>
        <li>Once the previous step is completed the platform will share to and encourage the rest of the community to check all those in need and how to help.</li>
        </ol>
</div>
        <div className="banner-img">
            <img className="banner-home" src={heroesImg} alt="banner" />    
        </div>
        </div>

    </>
    }
  }
  