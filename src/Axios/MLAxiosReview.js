import axios from "axios"
import { config } from "../utils/config";
import e from "cors";

const MLAxiosReview = axios.create({
    baseURL : config.backendURL,
    timeout: 5000,
    headers: {"Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods" : "GET, PUT, POST, DELETE, PATCH, OPTIONS"
}
});

export const createReview = async (mediaItemID, reviewDTO, userID) => {
    console.log("CREATING REVIEW!!!!!!!!!!!!!!!!!!!")
    console.log(mediaItemID, userID)
    const result = await MLAxiosReview.post("/"+mediaItemID+"/reviews/create", reviewDTO, userID)
    //TODO upewnic sie czy dziala
    
    return result.data;
}

export const updateReview = async (reviewID, reviewDTO) => {
    const result = await MLAxiosReview.post("/reviews/"+reviewID+"/update", reviewDTO);

    return result.data;
}

export const deleteReview = async (reviewID) => {
    const result = await MLAxiosReview.delete("/reviews/"+reviewID+"/delete")

    return result.data;
}

export const getReviewByID = async (reviewID) => {
    const result = await MLAxiosReview.get("/reviews/"+reviewID);

    return result.data;
}

export const getUserReviews = async (userID) => {
    const result = await MLAxiosReview.get("/users/"+userID+"/reviews")

    return result.data;
}

export const getItemReviews = async (ItemID) => {
    const result = await MLAxiosReview.get("/"+ItemID+"/reviews");

    return result.data;
}

export const getReviewScoreAvg = async (ItemID) => {
    const result = await MLAxiosReview.get("/"+ItemID+"/rating");

    return result.data;
}