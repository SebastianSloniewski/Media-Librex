import {React, useState} from "react";
import styled from "styled-components";
import LibPanelControl from "./LibPanelControl/LibPanelControl";
import { deleteCollection } from "../../Axios/MLAxiosPlaylists";


const _MainContainer = styled.div`
    background-color: purple;
    width: 100%;
    height: 100%;
    text-align: top;
    justify-content: center;
`;

const LibraryPanel = (props) => {
    
    const handleDelete = () => {
        console.log("Deleting collection: ", props.currentPlaylist.id)

        deleteCollection(props.currentPlaylist.id)

        props.switchToMainDisplay();
    }
    

    return (
        <_MainContainer className="MainContainer">
            <LibPanelControl 
                name={props.currentPlaylist.name}
                handleDelete={handleDelete}
            />
            <h1>LibPanel</h1>
            <h3>{props.currentPlaylist.name} : {props.currentPlaylist.id}</h3>

        </_MainContainer>
    );
}

export default LibraryPanel;