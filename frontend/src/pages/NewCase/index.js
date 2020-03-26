import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import "./styles.css";

import api from "../../services/api";

import LogoImg from "../../assets/logo.svg";

export default function NewCase() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const ngoId = localStorage.getItem("ngoId");

  const history = useHistory();

  async function handleNewCase(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try {
      await api.post("cases", data, {
        headers: {
          Authorization: ngoId
        }
      });
      history.push("/profile");
    } catch (err) {
      alert("Unable to register case, try again!");
    }
  }
  return (
    <div className="new-case-container">
      <div className="content">
        <section>
          <img src={LogoImg} alt="Be the Hero" />
          <h1>Register new case</h1>
          <p>Describe the case and find a hero to help with it.</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" /> Go Back
          </Link>
        </section>
        <form onSubmit={handleNewCase}>
          <input
            placeholder="Case title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Cost"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
