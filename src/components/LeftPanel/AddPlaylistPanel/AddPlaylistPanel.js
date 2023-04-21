import styled from "styled-components";
import React from "react";
import {AiOutlinePlusCircle} from "react-icons/ai"


const _PanelText = styled.h6`
    color: #8fd625;
`;

const _IconContainer = styled.div`
    &:hover {
        color: darkgreen;
    }
`;


const AddPlaylistPanel = (props) => {
    console.log("rendered APLP")

    const openPanel = () => {
        console.log("open panel APLP");
        props.addPlaylist();
    }


    return (
        <tr>
            <td><_PanelText>Dodaj Nową Playliste</_PanelText></td>
            <td>
                <_IconContainer>
                    <AiOutlinePlusCircle onClick={openPanel}/>
                </_IconContainer>
                
            </td>
            
        </tr>
    )
    
};

export default AddPlaylistPanel;