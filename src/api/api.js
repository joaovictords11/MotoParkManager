import axios from "axios";

const API_BASE_URL = "http://192.168.68.52:8080/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getMotos = (page = 0, size = 10) =>
  api.get(`/motos?page=${page}&size=${size}`);

export const createMoto = (moto) => api.post("/motos", moto);

export const searchMotoByPlaca = (placa) =>
  api.get(`/motos/search?placa=${placa}`);

export const checkIn = (placa) => api.post("/registros/checkin", { placa });

export const checkOut = (placa) => api.put("/registros/checkout", { placa });

export const getRegistrosByPlaca = (placa) =>
  api.get(`/registros?placa=${placa}`);

export default api;
