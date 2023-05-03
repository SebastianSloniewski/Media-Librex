import axios from "axios"


const MLAxiosMusic = axios.create({
    baseURL : 'http://localhost:8080/music/',
    timeout: 5000,
    headers: {"Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods" : "GET, PUT, POST, DELETE, PATCH, OPTIONS"
}
});

export const getMusicByName = async (name) => {
    console.log("Searching music url", "search?title=" + name)
    const result = await MLAxiosMusic.get("search?title=" + name);

    return result.data;
}

export const getMusicByID = async (id) => {
    const result = await MLAxiosMusic.get(""+id)

    return result.data;
}

export const getMusicByGenre = async (genre) => {
    const result = await MLAxiosMusic.get("genre/"+genre)

    return result.data;
}