import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import "./styles.css";
import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";
export default function Logon() {
  const [id, setId] = useState("");
  const history = useHistory();
  async function handlerLogon(e) {
    e.preventDefault();
    try {
      if (id) {
        const response = await api.get(`users/` + id);
        // const response = await api.get(`users`, {id});     ERA PRA SER ESSE FORMATO
        alert("Ola " + response.data.name);
        localStorage.setItem("userId", id);
        localStorage.setItem("userName", response.data.name);

        history.push("/profile");
      } else alert("Preencha os dados");
    } catch (err) {
      alert("erro ao logar, confira seus dados");
    }
  }
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="logo" />
        <form onSubmit={handlerLogon}>
          <h1>Faça seu login </h1>
          <input
            placeholder="Seu login"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link to="/register">
            <FiLogIn size={16} color="#e02041" /> Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} className="imagem" alt="heroes" />
    </div>
  );
}
