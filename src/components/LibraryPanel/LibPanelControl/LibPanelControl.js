import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";


const LPCpanel = styled.div`
    background-color: white;
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    padding: 0 30px 0 30px;
`;

const DeleteButton = styled.div`
    height: 60%;
    margin-left: 80px;
`;

const LibPanelControl = (props) => {


    return (
        <LPCpanel>
            {/* <h1>REEEEEEEEEEEEEEEEE</h1> */}
            <h2>{props.name}</h2>
            <DeleteButton >
                <Button variant="danger" 
                    onClick={() => props.handleDelete()}
                >
                    Usun Kolekcje 
                </Button>
            </DeleteButton>
            

        </LPCpanel>
    )

}

export default LibPanelControl;