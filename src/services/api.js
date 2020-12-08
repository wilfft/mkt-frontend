import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000", //vou passar a utl padrao
});

export default api;
