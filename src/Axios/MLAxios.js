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
export const getAllBooks = async () => {
    const result =  await MLAxios.get("books/search?title=Avatar");
    console.log("AXIOS GET");
    console.log("DATA: ", result.data)
    return result.data;
}

export const getBookInfo = async (bookId) => {
    const result = await MLAxios.get(`books/${bookId}`);

    return result.data;
}