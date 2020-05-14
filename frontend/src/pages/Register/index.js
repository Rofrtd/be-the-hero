import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";
import "./styles.css";

import LogoImg from "../../assets/logo.svg";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      state,
    };

    try {
      const response = await api.post("ngos", data);
      alert(`You access ID is: ${response.data.id}`);
      history.push("/");
    } catch (err) {
      alert("Sign up error, try again later!");
    }
  }
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={LogoImg} alt="Be the Hero" />
          <h1>Register</h1>
          <p>
            Sign up and help people find your non-profit organizations cases
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#8377eb" /> Log In
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="NGO name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            minLength="5"
            required
          />
          <input
            type="number"
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            required
          />
          <div className="input-group">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              minLength="4"
              required
            />
            <input
              type="text"
              maxLength="3"
              placeholder="State"
              style={{ width: 95 }}
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
