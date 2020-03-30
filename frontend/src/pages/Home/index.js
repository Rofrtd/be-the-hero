import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import "./styles.css";

import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";

export default class Home extends React.Component {
    render() {
      return <>
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <div className="user-btn">
                    <Link className="button" to="/login">
                    Login
                    </Link>
                    <Link className="button" to="/register">
                    Signup
                    </Link>
                </div>
            </header>    
        </div>
    </>
    }
  }
  