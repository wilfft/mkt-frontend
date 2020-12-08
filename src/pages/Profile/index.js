import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api"; //vai puxar servir pra dados do banco
import { FiPower, FiTrash2 } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";

export default function Profile() {
  const [items, setItems] = useState([]);
  const userName = localStorage.getItem("userName");
  const history = useHistory();
  let userID = localStorage.getItem("userId");

  useEffect(() => {
    api
      .get("users/profile", { headers: { Autorization: userID } })
      .then((e) => {
        setItems(e.data);
      });
  }, [userID]);

  async function handleDeleteProduct(id, item_name) {
    alert("Produto " + item_name + " removido com sucesso");
    try {
      await api.put(`users/${id}`, {
        headers: { Autorization: userID },
      });
      //aqui para atualizar os itens, vamos chamar o useState pelo setItens
      //e filtrar minha array de itens com os itens MENOS o id clicado
      setItems(items.filter((item) => item._id != id));
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

            <strong>Ativo:</strong>
            <p>{item.is_active}</p>

            <button
              onClick={() => handleDeleteProduct(item._id, item.item_name)}
              type="button"
            >
              <FiTrash2 size={20} color="#a8a8b3" />
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
