import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: 'http://192.168.1.3:8080/api'
});

export default AxiosInstance;