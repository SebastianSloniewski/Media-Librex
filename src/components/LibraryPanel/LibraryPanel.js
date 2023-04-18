import {React, useState} from "react";
import styled from "styled-components";


const _MainContainer = styled.div`
    background-color: purple;
    width: 100%;
    height: 100%;
    text-align: center;
    justify-content: center;
`;

const LibraryPanel = (props) => {

    console.log("Rendering LibPanel");
    console.log(props.currentPlaylist)
    console.log(props.currentPlaylist.title)

    return (
        <_MainContainer>
            <h1>LibPanel</h1>
            <h3>{props.currentPlaylist.title} : {props.currentPlaylist.plID}</h3>

        </_MainContainer>
    );
}

export default LibraryPanel;