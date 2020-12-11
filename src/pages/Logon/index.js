import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import api from "../../services/api";
import { Link, useHistory } from "react-router-dom";
import "./styles.css";
import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";

export default function Logon() {
  const [pass, setPass] = useState("");
  const [cpf, setCPF] = useState("");
  const history = useHistory();

  async function handlerLogon(e) {
    e.preventDefault();

    try {
      const response = await api.post("logon/", { cpf, pass });
      localStorage.setItem("userId", response.data._id);
      localStorage.setItem("userName", response.data.name);

      history.push("/profile");
      alert("Bem vindo  " + response.data.name);
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
            placeholder="Seu CPF"
            value={cpf}
            onChange={(e) => setCPF(e.target.value)}
          />
          <input
            placeholder="Sua senha"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
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
