import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styled from "styled-components";
import { MainDisplayType } from "../../utils/dataTypes";
import { getBooksByName } from "../../Axios/MLAxiosBooks";



const SearchBar = (props) => {
  const [currQuery, setCurrQuery] = useState("");
  const [searchType, setSearchType] = useState(props.searchType);


  const ExecuteSearch = () => {
    console.log("SEARCHING: " + props.searchType)
    
    switch (props.searchType) {
      case MainDisplayType.Books : 
        console.log("ksiazki");

        const searchResult = getBooksByName(currQuery);

        console.log(searchResult)

        break;
      case MainDisplayType.Movies :

        break;
      case MainDisplayType.Anime :

        break;
      case MainDisplayType.Music : 

        break;
      case MainDisplayType.TvSeries :

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