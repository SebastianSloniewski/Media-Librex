import axios from "axios"
import { config } from "../utils/config";


const MLAxiosFriends = axios.create({
    baseURL : config.backendURL + "api/friendships",
    timeout: 5000,
    headers: {"Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods" : "GET, PUT, POST, DELETE, PATCH, OPTIONS"
}
});

export const sendFriendRequest = async (userId, friendID) => {
    const result = await MLAxiosFriends.post("/" + userId + "/request", friendID)

    return result.data;
}

export const acceptFriendRequest = async (userId, friendID) => {
    const result = await MLAxiosFriends.post("/" + userId + "/accept", friendID)

    return result.data;
}

export const declineFriendRequest = async (userId, friendID) => {
    const result = await MLAxiosFriends.post("/" + userId + "/decline", friendID)

    return result.data;
}

export const removeFriend = async (userId, friendID) => {
    const result = await MLAxiosFriends.post("/" + userId + "/remove", friendID);

    return result.data;
}

export const getFriendsList = async (userId) => {
    const result = await MLAxiosFriends.get("/" + userId + "/friends");

    return result.data;
}