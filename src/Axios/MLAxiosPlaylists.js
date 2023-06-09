import axios from "axios"
import { config } from "../utils/config";

const MLAxiosCollections = axios.create({
    baseURL : config.backendURL,
    timeout: 5000,
    headers: {"Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods" : "GET, PUT, POST, DELETE, PATCH, OPTIONS"
}
});

export const getUserCollections = async (userId) => {
    const result = await MLAxiosCollections.get("" +userId+ "/collections");

    return result.data;
}

export const getCollectionByID = async (id) => {
    const result = await MLAxiosCollections.get("/collections/" + id);

    return result.data;
}

export const getAllCollections = async () => {
    const result = await MLAxiosCollections.get("/collections")

    return result.data;
}

export const deleteCollection = async (id) => {
    const result = await MLAxiosCollections.delete("collections/"+ id + "/delete");

    return result.data;
}

export const updateCollection = async (id, collection) => {
    const result = await MLAxiosCollections.post("/collections/"+ id + "/update", collection);
    

    return result.data;
}

export const createCollection = async (userId, mediaListDTO) => {
    const result = await MLAxiosCollections.post("/" + userId + "/collections/create", mediaListDTO)
    .then((response) => {
        //console.log(response)
    }).catch((response) => {
        //console.log(response);
    })

    //console.log(result)

    return result.data;
}

export const addToDefaultCollection = async (userID, mediaListItems) => {
    const result = await MLAxiosCollections.post("/" + userID + "/collections/default/add", mediaListItems)

    return result.data;
}

export const getUserDefaultCollection = async (userID) => {
    const result = await MLAxiosCollections.get("/" + userID + "/collections/default");

    return result.data;
}