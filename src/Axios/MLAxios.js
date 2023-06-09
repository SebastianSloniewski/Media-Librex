import axios from "axios"
import { config } from "../utils/config";


const MLAxios = axios.create({
    baseURL : config.backendURL,
    timeout: 5000,
    headers: {"Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods" : "GET, PUT, POST, DELETE, PATCH, OPTIONS"
}
});

//funckje z zapytaniem tworzymy w postaci:
export const searchUsersName = async (name) => {
    const result = await MLAxios.get("/users/search?name=" + name);

    return result.data;
}