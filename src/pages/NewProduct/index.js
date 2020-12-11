import React, { useState } from "react";
import "./style.css";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  let id = localStorage.getItem("userId");
  const history = useHistory();

  async function handleAddProduct(e) {
    e.preventDefault();

    const data = { title, description, price };

    try {
      await api.patch("product", data, {
        headers: { Authorization: id },
      });
      //o id vai vir pelo header
      history.push("/profile");
    } catch (err) {
      alert("Erro ao adicionar");
    }
  }
  return (
    <div className="new-product-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="logoImg" />
          <h1> Anunciar Produto </h1>
          <p>Informe o valor em reais </p>
          <p>e o máximo de detalhes sobre o produto</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" /> Voltar
          </Link>
        </section>
        <form onSubmit={handleAddProduct}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Produto"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descriçao"
          />

          <input
            value={price}
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Valor em Reais"
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
