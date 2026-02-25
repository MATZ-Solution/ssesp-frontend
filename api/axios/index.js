import axios from "axios";
import { store } from "../../redux/store";
import { removeUser } from "../../redux/slices/authSlice";

const api = axios.create({
  // live database
  // baseURL: 'https://ssespserver.matzsolutions.com',
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
    // For example, attach auth token here
    const token = store.getState().auth.user?.token; // Add optional chaining
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.log("Request error: ", error);
    return Promise.reject(error); // Add return
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Response error: ", error);

    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timed out. Please try again.';
    } else if (!error.response) {
      error.message = 'Network error. Please check your connection.';
    }

    if (error.response?.status === 401) {
      const message = error.response?.data?.message; // Uncomment this line
      window.location.href = "/";
      // if (message === "Token expired") {
      //   store.dispatch(removeUser());
      //   window.location.href = "/";
      // }
    }

    return Promise.reject(error);
  }
);

export default api;