

export const MovieToSubItem = (elem) => {
    //console.log("Converting Movie from api to displaySub")
    const movieSubData = {};
    movieSubData.id = elem.id;
    movieSubData.title = elem.title;
    movieSubData.rating = 6;
    movieSubData.url = elem.covers[0].url;

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

    return musicSubData;

}


//do popracowania jak url zdobyc
export const BookToSubItem = (elem) => {
    const bookSubData = {};
    
    bookSubData.id = elem.id;
    bookSubData.title = elem.title;
    //###################
    bookSubData.rating = 7;
    bookSubData.url = "";

    return bookSubData;
}