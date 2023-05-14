import {React, useState} from "react";
import styled from "styled-components";


const _MainContainer = styled.div`
    background-color: purple;
    width: 100%;
    height: 100%;
    text-align: top;
    justify-content: center;
`;

const LibraryPanel = (props) => {
    

    // console.log("Rendering LibPanel");
    // console.log(props.currentPlaylist)
    // console.log(props.currentPlaylist.title)
    //console.log("LIB", props)

    return (
        <_MainContainer>
            <h1>LibPanel</h1>
            <h3>{props.currentPlaylist.name} : {props.currentPlaylist.id}</h3>

        </_MainContainer>
    );
}

export default LibraryPanel;