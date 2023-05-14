import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";


const LPCpanel = styled.div`
    background-color: white;
    width: 100%;
    height: 10%;
    display: block;
`;

const LibPanelControl = (props) => {


    return (
        <LPCpanel>
            {/* <h1>REEEEEEEEEEEEEEEEE</h1> */}
            <h2>{props.name}</h2>
            <Button variant="danger" onClick={() => props.handleDelete()}>Usun Kolekcje </Button>

        </LPCpanel>
    )

}

export default LibPanelControl;