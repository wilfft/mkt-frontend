import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";
import "./style.css";

export default function Register() {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [ddd, setDDD] = useState("");
  const history = useHistory();

  //storing data on register click
  //vou concatenar o ddd com o celular pra inserir no banco
  async function handleRegister(e) {
    e.preventDefault();
    const data = { name, cpf, email, password, city, whatsapp, ddd };

    try {
      const response = await api.post("users", data);
      history.push("/");
      alert("Seu login De acesso é o seu cpf : " + response.data.cpf);
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
            placeholder="CPF"
            type="number"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="input-group">
            <input
              placeholder="DDD"
              value={ddd}
              type="number"
              maxlength="2"
              onChange={(e) => setDDD(e.target.value)}
              style={{ width: 100 }}
            />
            <input
              placeholder="Whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              type="number"
            />
          </div>
          <div className="input-group">
            <input
              placeholder="UF"
              value={uf}
              maxlength="2"
              onChange={(e) => setUf(e.target.value)}
              style={{ width: 100 }}
            />
            <input
              placeholder="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {/*      para implementar no futuro
            <select value={uf} onChange={(e) => setUf(e.target.value)}>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select> JSX */}
          </div>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
