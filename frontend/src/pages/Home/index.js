import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./styles.css";

import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";

export default function Home() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    api.get("cases").then(res => {
      setCases(res.data);
    });
  }, []);

  return (
    <div className="home-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <div className="buttons">
          <Link className="button" to="/login">
            Login
          </Link>
          <Link className="button" to="/register">
            Sign up
          </Link>
        </div>
      </header>
      <div className="banner-container">
        <div className="banner-text">
          <h1 className="text-title">About Us</h1>
          <p>
            We are a non profit platform created to help people find local{" "}
            <strong style={{ color: "#e02041" }}>HEROES</strong>. Our goal is to
            match people in need with people willing to help.
          </p>
          <br></br>
          <h1 className="text-title">How it works?</h1>
          <ol>
            <li>
              Users are encouraged to sign up and post asking for help or
              offering help.
            </li>
            <li>
              Your post will be shared and the platform will encourage people to
              check all those in need and provide details in how to help.
            </li>
          </ol>
        </div>
        <img src={heroesImg} alt="Heroes" />
      </div>
      <ul>
        {cases.map(c => (
          <li key={c.id}>
            <div className="case-header">
              <strong>{c.title}</strong>
              <p>
                {c.name} from {c.city + "-" + c.state}
              </p>
            </div>
            <div className="case-description">
              <p>{c.description}</p>
            </div>
            <Link className="button" to="/">
              Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
