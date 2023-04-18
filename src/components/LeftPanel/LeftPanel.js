import {React, useState} from "react";
import styled from "styled-components";
import PlayListRow from "./PlaylistRow/PlayListRow";
import Table from "react-bootstrap/Table"


const _MainPanelContainer = styled.div`
    position: fixed;
	height:100%;
	margin-top: 11.5%;
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


    console.log("Rendered left panel with props: ", props);

    const handleSelectPlaylist = (id) => {
        console.log("Selected " + id + " row");
    }


    return (
        <_MainPanelContainer className="sideBar col-lg-2 container">
            <_Title>
                <h1>Kolekcje</h1>
            </_Title>
            <div>
                <Table bordered={false}>
                    <tbody>
                        {playlists.map((value, id) => <PlayListRow 
                            title={value.title} 
                            size={value.size} 
                            id={id} 
                            key={id} 
                            onPlaylistSelect={handleSelectPlaylist}/>)}
                    </tbody>
                    
                </Table>
            </div>
        </_MainPanelContainer>
    )

}

export default LeftPanel;