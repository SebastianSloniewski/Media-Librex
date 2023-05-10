import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styled from "styled-components";
import { MainDisplayType } from "../../utils/dataTypes";
import { getBooksByName } from "../../Axios/MLAxiosBooks";
import { getMusicByName } from "../../Axios/MLAxiosMusic";
import { getMoviesByName } from "../../Axios/MLAxiosFilms";
import { MovieToSubItem } from "../../utils/ApiToElemConverter";



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

        break;
      case MainDisplayType.Movies :
        const searchResultsMovies = getMoviesByName(currQuery);
        //###############################################
        //TODO filtracja na tylko filmy oraz obsluga bledow

        searchResultsMovies.then((response) => {
          console.log("FILMY: ", response);

          const convertedMovies = [];

          console.log("looooooop")
          let i = 0;
          while(i < response.length){
            convertedMovies.push(MovieToSubItem(response[i]));
            i++;
          }
          props.handleSearch(currQuery, convertedMovies);

        })

        

        break;
      case MainDisplayType.Anime :

        break;
      case MainDisplayType.Music : 
        console.log("muzyka")
        const searchResultMusic = getMusicByName(currQuery);
        console.log(searchResultMusic)

        break;
      case MainDisplayType.TvSeries :
        //TODO tak samo jak filmy tylko z filtracja na seriale

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