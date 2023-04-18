import {React, useState} from "react";
import styled from "styled-components";
import PlayListRow from "./PlaylistRow/PlayListRow";
import Table from "react-bootstrap/Table"


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


    //console.log("Rendered left panel with props: ", props);

    const handleSelectPlaylist = (id) => {
        props.handlePlaylistSelection(id);
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
                    </tbody>
                    
                </Table>
            </div>
        </_MainPanelContainer>
    )

}

export default LeftPanel;