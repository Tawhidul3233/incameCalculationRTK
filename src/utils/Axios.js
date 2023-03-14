import axios from "axios";

// http://localhost:9000/transactions
// create axios instance 
const axiosInstance = axios.create({
  baseURL: 'http://localhost:9000',
})

export default axiosInstance;