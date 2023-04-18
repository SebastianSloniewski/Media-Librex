import {React, useState} from "react";
import styled from "styled-components";
import PlayListRow from "./PlaylistRow/PlayListRow";
import Table from "react-bootstrap/Table"


const _MainPanelContainer = styled.div`
    /* background: black;
    color: black;
    width: 100%;
    height: 100%; */

`;




const LeftPanel = (props) => {
    const [playlists, setPlayLists] = useState(props.userPlaylists);


    console.log("Rendered left panel with props: ", props);

    return (
        <div className="sideBar">
            <div>
                <Table>
                    {playlists.map((value, id) => <PlayListRow title={value.title} size={value.size} key={id}/>)}
                </Table>
            </div>
        </div>
    )

}

export default LeftPanel;