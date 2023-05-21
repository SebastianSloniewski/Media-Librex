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
`;

const LibraryPanel = (props) => {
    const [Items, setItems] = useState([])

    // useEffect(() => {
    //     console.log("EFFECTS LIBPAN")

    //     const conv = convertList(props.currentPlaylist.mediaListItems)

    // }, [])

    // console.log("LIBPANEL PROPS: ", props)
    // console.log("CURRENT PL: ", props.currentPlaylist)
    // console.log("CONVERTED LIST: ", props.currentPlaylist.mediaListItems.map(item => MediaItemToSubItem(item)))
    
    const handleDelete = () => {
        console.log("Deleting collection: ", props.currentPlaylist.id)

        deleteCollection(props.currentPlaylist.id)

        props.switchToMainDisplay();
    }

    const convertList = (list) => {
        const newList = []

        console.log("START LIST: ", props.currentPlaylist.mediaListItems)

        let i =1;
        while(i < props.currentPlaylist.mediaListItems.lenght){
            const newItem = MediaItemToSubItem(props.currentPlaylist.mediaListItems[i].mediaItem)

            console.log("NEW ITEM: ", newItem);

            newList.push(newItem);
            i++;
        }

        console.log("Converted: ", newList);
        return newList;

    }

    const handleItemDelete = (id) => {
        // console.log("DELETING ITEM WITH ID: ", id);
        // console.log("In collection: ", props.currentPlaylist)

        // const newCollectionList = props.currentPlaylist.mediaListItems.filter(elem => elem.mediaItem.id !== id)

        // console.log("LIST after: ", newCollectionList)

        // let newCollect = props.currentPlaylist;
        

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