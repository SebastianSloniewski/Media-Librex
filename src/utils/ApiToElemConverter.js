import { getBookCoverMedium, getBookCoverSmall } from "../Axios/MLAxiosBooks";


export const MovieToSubItem = (elem) => {
    //console.log("Converting Movie from api to displaySub")
    const movieSubData = {};
    movieSubData.id = elem.id;
    movieSubData.title = elem.title;
    movieSubData.rating = 6;
    movieSubData.url = elem.covers[0].url;
    movieSubData.mediaType = elem.mediaType;

    //console.log("Created movieSubData: ", movieSubData)
    return movieSubData;
}

export const MusicToSubItem = (elem) => {
    //TODO filtracja po ID (zeby bylo)
    const musicSubData = {};
    musicSubData.id = elem.id;
    musicSubData.title = elem.title;
    musicSubData.rating = 6;
    musicSubData.url = elem.covers[3].url;
    musicSubData.mediaType = elem.mediaType;

    return musicSubData;

}


//do popracowania jak url zdobyc
export const BookToSubItem = async (elem) => {
    const bookSubData = {};

    const coverData = await getBookCoverMedium(elem.id);

    // console.log("CONVERTING BOOK");
    // console.log(coverData)

    bookSubData.id = elem.id;
    bookSubData.title = elem.title;
    bookSubData.rating = 4;
    bookSubData.url = coverData;
    bookSubData.mediaType = elem.mediaType;

    
    // //TODO placeholder
    // bookSubData.url = "";
    // bookSubData.mediaType = elem.mediaType;
    // console.log("Converted Book: ", bookSubData)

    return bookSubData;
}