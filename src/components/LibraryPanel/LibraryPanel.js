import {React, useEffect, useState} from "react";
import styled from "styled-components";
import LibPanelControl from "./LibPanelControl/LibPanelControl";
import { deleteCollection } from "../../Axios/MLAxiosPlaylists";
import GridItemsPanel from "../GridItemsPanel/GridItemsPanel";
import { MediaItemToSubItem } from "../../utils/ApiToElemConverter";


const _MainContainer = styled.div`
    background-color: white;
    width: 100%;
    height: 100%;
    text-align: top;
    justify-content: center;
    margin-top: 30px;
    padding: 0 20px 0 20px;
`;

const LibraryPanel = (props) => {
    const [Items, setItems] = useState([])
    
    const handleDelete = () => {

        deleteCollection(props.currentPlaylist.id)

        props.switchToMainDisplay();
    }

    const convertList = (list) => {
        const newList = []


        let i =1;
        while(i < props.currentPlaylist.mediaListItems.lenght){
            const newItem = MediaItemToSubItem(props.currentPlaylist.mediaListItems[i].mediaItem)

            newList.push(newItem);
            i++;
        }
        return newList;

    }

    const handleItemDelete = (id) => {
        let playlist = props.currentPlaylist;

        const newCollectionList = playlist.mediaListItems.filter(elem => elem.mediaItem.id !== id)

        playlist.mediaListItems = newCollectionList;
        
        props.handleChange(playlist)
    }
    

    return (
        <_MainContainer className="MainContainer">
            <LibPanelControl 
                name={props.currentPlaylist.name}
                handleDelete={handleDelete}
            />
            <GridItemsPanel 
                items={props.currentPlaylist.mediaListItems.map(item => MediaItemToSubItem(item.mediaItem))}
                itemSwitch={(elem) => props.itemSwitch(elem)}
                isDeletable={true}
                handleDelete={handleItemDelete}
            />

        </_MainContainer>
    );
}

export default LibraryPanel;