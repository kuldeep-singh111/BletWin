import axios from "axios";

// Production baseURL
// baseURL: https://api.lyaim.com

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9000",
  withCredentials: true,
});

//  Response Interceptor (Global Error Handling)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(
      "Server API Error:",
      error.response?.data?.message || error.message
    );
    return Promise.reject(error);
  }
);

//  Centralized API Methods
const apiService = {
  signup: (data) => API.post("/signup", data),
  login: (data) => API.post("login", data),
  logout: () => API.post("/logout"),
  profile: () => API.get("profile"),
  profileUpdate: (data) => API.put("profile/update", data),
  contact: (data) => API.post("api/contact", data),
  matchOverview: () => API.get("match/overview"),
  leaderboard: () => API.get("leaderboard"),

  //  Generic API Calls
  fetchData: (endpoint) => API.get(endpoint),
  postData: (endpoint, data) => API.post(endpoint, data),

  // Added the PUT method
  putData: (endpoint, data) => API.put(endpoint, data),

  // Added the DELETE method 
  deleteData: (endpoint) => API.delete(endpoint),
};

export default apiService;
