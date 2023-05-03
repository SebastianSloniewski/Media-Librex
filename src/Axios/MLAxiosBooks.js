import axios from "axios"


const MLAxiosBooks = axios.create({
    baseURL : 'http://localhost:8080/',
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