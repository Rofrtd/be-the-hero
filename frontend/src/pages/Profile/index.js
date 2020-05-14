import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import "./styles.css";

import logoImg from "../../assets/logo.svg";
import api from "../../services/api";

export default function Profile() {
  const [cases, setCases] = useState([]);

  const history = useHistory();
  const ngoId = localStorage.getItem("ngoId");
  const ngoName = localStorage.getItem("ngoName");

  useEffect(() => {
    api
      .get("profile", {
        headers: {
          Authorization: ngoId,
        },
      })
      .then((res) => {
        setCases(res.data);
      });
  }, [ngoId]);

  async function handleDeleteCase(id) {
    try {
      await api.delete(`cases/${id}`, {
        headers: {
          Authorization: ngoId,
        },
      });

      setCases(cases.filter((cases) => cases.id !== id));
    } catch (err) {
      alert("Unable to delete case, try again!");
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Welcome {ngoName}</span>
        <Link className="button" to="/cases/new">
          Register new case
        </Link>
        <button type="button">
          <FiPower onClick={handleLogout} size={18} color="#8377eb"></FiPower>
        </button>
      </header>
      <h1>Registered Cases</h1>
      <ul>
        {cases.map((c) => (
          <li key={c.id}>
            <strong>CASE:</strong>
            <p>{c.title}</p>

            <strong>DESCRIPTION:</strong>
            <p>{c.description}</p>

            <strong>COST:</strong>
            <p>
              {Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "AUD",
              }).format(c.value)}
            </p>
            <button onClick={() => handleDeleteCase(c.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
