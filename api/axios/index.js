import axios from "axios";
import { store } from "../../redux/store";
import { removeUser } from "../../redux/slices/authSlice";
import { useSelector } from "react-redux";

const api = axios.create({
  // live database
  // baseURL: 'https://iccdinternalsystemserver.matzsolutions.com',
  baseURL: "http://localhost:22309/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // optional timeout
});

// Optional: Add interceptors for auth, logging, errors
api.interceptors.request.use(
  (config) => {
    // For example, attach auth token heres
    const token = store.getState().auth.user.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },

  (error) => {
    console.log("err1: ", error)
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("error: ", error)
    if (error.response?.status === 401) {
      store.dispatch(removeUser());
      window.location.href = "/";
      // const message = error.response?.data?.message;
      // if (message === "Token expired") {
      // store.dispatch(removeUser());
      // window.location.href = "/";
      // }
    }
    return Promise.reject(error);
  }
);

export default api;