import {React, useState} from "react";
import styled from "styled-components";
import PlayListRow from "./PlaylistRow/PlayListRow";
import Table from "react-bootstrap/Table"
import AddPlaylistPanel from "./AddPlaylistPanel/AddPlaylistPanel";
import AddPlaylistModal from "./AddPlaylistModal/AddPlaylistModal";


const _MainPanelContainer = styled.div`
   	position: fixed;
	height:100%;
	width: 280px;
	margin-top: 180px;
	background-color: white;
    border-right-style: outset;
    padding-top: 10px;

`;

const _Title = styled.div`
    justify-content: center;
    text-align: center;
`;


const LeftPanel = (props) => {
    const [playlists, setPlayLists] = useState(props.userPlaylists);
    const [isAddPanelOpen, setIsPanelOpen] = useState(false);
    

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
        props.handleListChange(newList);
        setPlayLists(newList);
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
                            title={value.title} 
                            size={value.size} 
                            id={value.plID} 
                            key={value.plID} 
                            onPlaylistSelect={handleSelectPlaylist}/>)}

                        <AddPlaylistPanel addPlaylist={openAddPanel}/>
                    </tbody>
                    <AddPlaylistModal show={isAddPanelOpen} closeHandler={closeAddPanel} addPlaylist={AddNewPlaylist}/>
                    
                </Table>
            </div>
        </_MainPanelContainer>
    )

}

export default LeftPanel;