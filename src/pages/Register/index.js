import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";
import "./style.css";

export default function Register() {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();
    const data = { name, login, password, email };

    try {
      const response = await api.post("users", data);
      history.push("/");
      alert("Seu ID De acesso é: " + response.data._id);
    } catch (err) {
      alert("erro no cadastro, tente novamente");
    }
  }
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="logoImg" />
          <h1> Cadastro </h1>
          <p>Faça seu cadastro e comece a vender hoje mesmo</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" /> Não tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="input-group">
            <input placeholder="Cidade" />
            <input placeholder="UF" style={{ width: 80 }} />
          </div>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
