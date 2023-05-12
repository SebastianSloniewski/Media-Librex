import axios from "axios"
import { config } from "../utils/config";


const MLAxiosBooks = axios.create({
    baseURL : config.backendURL,
    timeout: 5000,
    headers: {"Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods" : "GET, PUT, POST, DELETE, PATCH, OPTIONS"
}
});

//Działa
export const getBooksByName = async (name) => {
    console.log("Searching with URL: ", "books/search?title=" + name);
    const result = await MLAxiosBooks.get("books/search?title=" + name);

    return result.data;
}

export const getBookByID = async (isbn) => {
    const result = await MLAxiosBooks.get("books/"+ isbn);

    return result.data;
}

export const getBooksByAuthor = async (authorKey) => {
    const result = await MLAxiosBooks.get("author/" + authorKey + "/books")

    return result.data;
}

export const getBooksBySubject = async (subject, limit) => {
    const result = await MLAxiosBooks.get("books/subject/"+subject);

    return result.data;
}

//TODO getCOVER
//size: S M L
export const getBookCoverSmall = async (id) => {
    const result = await MLAxiosBooks.get("books/cover?typeId=olid&size=S&id="+id)

    return result.data;
}

export const getBookCoverMedium = async (id) => {
    const result = await MLAxiosBooks.get("books/cover?typeId=olid&size=M&id="+id)

    return result.data;
}