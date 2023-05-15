import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styled from "styled-components";
import { MainDisplayType } from "../../utils/dataTypes";
import { getBooksByName } from "../../Axios/MLAxiosBooks";
import { getMusicByName } from "../../Axios/MLAxiosMusic";
import { getMoviesByName } from "../../Axios/MLAxiosFilms";
import { BookToSubItem, MovieToSubItem, MusicToSubItem } from "../../utils/ApiToElemConverter";



const SearchBar = (props) => {
  const [currQuery, setCurrQuery] = useState("");
  const [searchType, setSearchType] = useState(props.searchType);


  const ExecuteSearch = () => {
    console.log("SEARCHING: " + props.searchType)
    
    switch (props.searchType) {
      case MainDisplayType.Books : 
        console.log("ksiazki");

        const searchResultBooks = getBooksByName(currQuery);
        console.log(searchResultBooks)

        searchResultBooks.then(async (response) => {

          const convertedBooks = [];

          let i = 0;
          while(i < response.length){
            if(response[i].id !== ""){
              let book = await BookToSubItem(response[i]);
              convertedBooks.push(book);
            }

            i++;
          }
          //console.log("BOOKS CONV", convertedBooks);

          props.handleSearch(currQuery, convertedBooks);
        }, () => {
          console.log("failure")
          props.handleSearch(currQuery, []);
        })

        

        break;
      case MainDisplayType.Movies :
        const searchResultsMovies = getMoviesByName(currQuery);
        //###############################################
        //TODO obsluga bledow

        searchResultsMovies.then((response) => {
          console.log("FILMY: ", response);

          const convertedMovies = [];

          let i = 0;
          while(i < response.length){
            if(response[i].mediaType === "movie")
            {
              if(response[i].id !== ""){
                convertedMovies.push(MovieToSubItem(response[i]));
              }
            }
            i++;
          }
          props.handleSearch(currQuery, convertedMovies);
        }, () => {
          props.handleSearch(currQuery, []);
        })

        

        break;
      case MainDisplayType.Anime :

        break;
      case MainDisplayType.Music : 
        const searchResultMusic = getMusicByName(currQuery);

        searchResultMusic.then((response) => {
          console.log("muzyka")
          console.log(searchResultMusic)

          const convertedMusic = [];

          let i = 0;
          while(i< response.length){
            if(response[i].id !== ""){
              convertedMusic.push(MusicToSubItem(response[i]));
            }
            i++;
          }
          props.handleSearch(currQuery, convertedMusic);
        }, () => {
          props.handleSearch(currQuery, []);
        })


        break;
      case MainDisplayType.TvSeries :
        //TODO tak samo jak filmy tylko z filtracja na seriale
        const searchResultsSeries = getMoviesByName(currQuery);

        searchResultsSeries.then((response) => {
          console.log("FILMY: ", response);

          const convertedSeries = [];

          let i = 0;
          while(i < response.length){
            if(response[i].mediaType === "series")
            {
              if(response[i].id !== ""){
                convertedSeries.push(MovieToSubItem(response[i]));
              }
            }
            i++;
          }
          props.handleSearch(currQuery, convertedSeries);
        }, () => {
          props.handleSearch(currQuery, []);
        })
        break;
      default :
        console.log("BŁAD")
    }

    //setCurrQuery("");
  }


  const handleChange = (e) => {
    setCurrQuery(e.target.value)
  }

  return (
    <div className="lg-12 search__bar" >
      <Row>
        <Col lg={12}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 rounded-pill"
              aria-label="Search"
              onChange={handleChange}
            />
            <Button className="rounded-pill" variant="outline-primary" onClick={ExecuteSearch}>
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default SearchBar;