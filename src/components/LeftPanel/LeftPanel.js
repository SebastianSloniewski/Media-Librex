import {React, useEffect, useState} from "react";
import styled from "styled-components";
import PlayListRow from "./PlaylistRow/PlayListRow";
import Table from "react-bootstrap/Table"
import AddPlaylistPanel from "./AddPlaylistPanel/AddPlaylistPanel";
import AddPlaylistModal from "./AddPlaylistModal/AddPlaylistModal";
import { createCollection } from "../../Axios/MLAxiosPlaylists";


const _MainPanelContainer = styled.div`
   	position: fixed;
	height:100%;
	width: 280px;
	margin-top: 180px;
	background-color: white;
    border-right-style: outset;
    padding-top: 10px;
    z-index: 1000;

`;

const _Title = styled.div`
    justify-content: center;
    text-align: center;
`;


const LeftPanel = (props) => {
    const [playlists, setPlayLists] = useState(props.userPlaylists);
    const [isAddPanelOpen, setIsPanelOpen] = useState(false);
    
    console.log("Playlists: ", playlists)

    useEffect(() => {
        console.log("effects playlists")
        setPlayLists(props.userPlaylists);
        console.log(playlists)

    }, [props.userPlaylists])

    const openAddPanel = () => {
        setIsPanelOpen(true);
    }

    const closeAddPanel = () => {
        setIsPanelOpen(false);
    }

    //console.log("Rendered left panel with props: ", props);

    const handleSelectPlaylist = (id) => {
        props.handlePlaylistSelection(id);
    }

    const AddNewPlaylist = (playlist) => {
        const newList = [...playlists, playlist]

        createCollection(props.currentUser.id, playlist)
        props.handleListChange(newList);
        setPlayLists(newList);

        console.log("Adding new playlist")
    }


    return (
        <_MainPanelContainer className="col-lg-2 container sideBar">
            <_Title>
                <h1>Kolekcje</h1>
            </_Title>
            <div>
                <Table bordered={false}>
                    <tbody>
                        {playlists.map((value) => <PlayListRow 
                            title={value.name} 
                            size={value.mediaListItems.length === undefined ? 0 : value.mediaListItems.length} 
                            id={value.id} 
                            key={value.id} 
                            onPlaylistSelect={handleSelectPlaylist}/>)}

                        <AddPlaylistPanel addPlaylist={openAddPanel}/>
                    </tbody>
                    <AddPlaylistModal 
                        show={isAddPanelOpen} 
                        closeHandler={closeAddPanel} 
                        addPlaylist={AddNewPlaylist}
                        currentUser={props.currentUser}
                        />
                    
                </Table>
            </div>
        </_MainPanelContainer>
    )

}

export default LeftPanel;