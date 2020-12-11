import React, { useEffect, useState } from "react";

import { Link, useHistory } from "react-router-dom";
import api from "../../services/api"; //vai puxar servir pra dados do banco
import { FiPower, FiTrash } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import "./style.css";
export default function Profile() {
  const [items, setItems] = useState([]);
  const userName = localStorage.getItem("userName");
  let userId = localStorage.getItem("userId");

  const history = useHistory();

  useEffect(() => {
    api.get("profile", { headers: { autorization: userId } }).then((e) => {
      setItems(e.data);
    });
  }, [userId]);

  async function handleDeleteProduct(id, item_name) {
    try {
      await api.patch("user/" + id, {
        headers: { autorization: userId },
      });
      //aqui para atualizar os itens, vamos chamar o useState pelo setItens
      //e filtrar minha array de itens com os itens MENOS o id clicado
      alert("Produto " + item_name + " removido com sucesso");
      console.log(id);
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      alert("erro");
    }
  }

  function handleLogout() {
    localStorage.clear(); //limpo o storage
    history.push("/"); //redirenciono pro inicio com o useHistory
  }
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="logoImg" />
        <span>Bem vindo, {userName.toUpperCase()}</span>
        <Link className="button" to="/product/new">
          Cadastrar novo produto
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>
      <h1>Produtos anunciados </h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <strong>PRODUTO:</strong>
            <p>{item.item_name}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{item.item_description}</p>
            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(item.item_value)}{" "}
            </p>

            <button
              onClick={() => handleDeleteProduct(item._id, item.item_name)}
              type="button"
            >
              <FiTrash className="icon" size={30} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/*
 <ul>
        {itens.map((item) => (
          <li key={item._id}>
            <strong>PRODUTO:</strong>
            <p>{item.title}</p>
            <strong>PRODUTO:</strong>
            <p>{item.description}</p>
            <strong>VALOR:</strong>
            <p>R$ {item.value}</p>
            <strong>Anunciado:</strong>
            <p>R$ {item.is_active}</p>

            <button type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
*/
/*
  useEffect(() => {
    api.get("users/item", { userID }).then((response) => {
      console.log(response.data);
      setItems(response.data.item);
    });
  }, [userID]); //é interessante colocar o userID como dependencia
  //  const arr = ([] = Array.from(response.data));
  //  console.log(arr);
  //  const array = response.data.item;
  */
