import axios from "axios"


const MLAxiosFilms = axios.create({
    baseURL : 'http://localhost:8080/movies/',
    timeout: 5000,
    headers: {"Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods" : "GET, PUT, POST, DELETE, PATCH, OPTIONS"
}
});

export const getMoviesByName = async (name) => {
    const result = await MLAxiosFilms.get("search?title="+ name);

    return result.data;
}

export const getMovieById = async (id) => {
    const result = await MLAxiosFilms.get(""+ id)

};