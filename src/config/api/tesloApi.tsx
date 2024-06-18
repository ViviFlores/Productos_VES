import { API_URL, API_URL_ANDROID, STAGE } from "@env";
import axios from "axios";
import { StorageAdapter } from "../adapters/storage-adapter";

//Definimos la url del API BASE
export const API_URL_BASE = (STAGE === 'prod') ? API_URL : API_URL_ANDROID;

//Conexión general a la API
const tesloApi = axios.create({
    baseURL: API_URL_BASE,
    headers: {
        'Content-Type': 'application/json'
    }
});

//TODO: Interceptors
tesloApi.interceptors.request.use(
    async (config) => {
        //Verificar token en el storage
        const token = await StorageAdapter.getItem('token');
        if (token) {
            //Colocar y configurar en el headers
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;

    }
)

export {
    tesloApi
}