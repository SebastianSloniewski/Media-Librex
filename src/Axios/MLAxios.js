import axios from "axios"


const MLAxios = axios.create({
    baseURL : 'https://some-domain.com/api/',
    timeout: 1000
});

//funckje z zapytaniem tworzymy w postaci:
export const getAllBooks = async () => {
    const result =  await MLAxios.get("books/");

    return result.data;
}

export const getBookInfo = async (bookId) => {
    const result = await MLAxios.get(`books/${bookId}`);

    return result.data;
}