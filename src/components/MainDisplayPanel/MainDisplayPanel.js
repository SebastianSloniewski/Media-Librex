import styled from "styled-components";
import {React, useState} from "react";

const _MainDisplayContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: red;    
`;

const MainDisplayPanel = (props) => {

    console.log("rendered main display panel of " + props.type);

    return (
        <_MainDisplayContainer>

        </_MainDisplayContainer>
    );
}

export default MainDisplayPanel;