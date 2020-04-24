const CityListURL = "https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json";
const currentLocation = "https://api.opencagedata.com/geocode/v1/json?q=";
const APIKeyForCurrentLocationAPI = "&key=2918f060d2bf4c329cf84d480b8dc2c5";
const weatherAPI = "https://openweathermap.org/data/2.5/weather?q=";
const weatherAPIKey ="&appid=439d4b804bc8187953eb36d2a8c26a02";

const baseUrl = "http://localhost:4000";

const nodeServerLogin = `${baseUrl}/users/login`;
const nodeServerAddToCart = `${baseUrl}/carts/addtocart`;
const nodeServerViewCart = `${baseUrl}/carts/cartItem`;
const nodeServerRemoveFromCart = `${baseUrl}/carts/remove`;

export default {
  CityListURL,
  currentLocation,
  APIKeyForCurrentLocationAPI,
  weatherAPI,
  weatherAPIKey,
  nodeServerLogin,
  nodeServerAddToCart,
  nodeServerViewCart,
  nodeServerRemoveFromCart
}