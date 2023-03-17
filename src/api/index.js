import axios from "axios";

const DEFAULT_SERVER_URL = "http://localhost:8080";

const apiGetIngredients = () => {
  return axios.get(`${DEFAULT_SERVER_URL}/ingredients`);
};

const apiPostBurgers = body => {
  return axios.post(`${DEFAULT_SERVER_URL}/burgers`, body);
};

export { apiGetIngredients, apiPostBurgers };
