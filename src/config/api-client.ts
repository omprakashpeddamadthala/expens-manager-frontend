import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:9090/api/v1",
});

export default apiClient;
