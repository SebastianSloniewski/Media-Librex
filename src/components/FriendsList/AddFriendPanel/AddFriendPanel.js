import {React, useEffect, useState} from "react";
import styled from "styled-components";
import {AiOutlinePlusCircle} from "react-icons/ai"
import { Form } from "react-bootstrap";


const AddFriendPanel = (props) => {
    const [currQuery, setCurrQuery] = useState("")
    const [queryResult, setQueryResult] = useState([])


    useEffect(() => {
        console.log("EFFECT ADD FIREND")
        //fetching for friends


    }, [currQuery])


    const handleQueryChange = (e) => {
        setCurrQuery(e.target.value)
    }

    return (
        <div>
            {/* searchbar */}
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 rounded-pill"
              aria-label="Search"
              onChange={handleQueryChange}
            />
            <AiOutlinePlusCircle/>
        </div>
    )

}

export default AddFriendPanel;