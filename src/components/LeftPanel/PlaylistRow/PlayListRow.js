import {React, useState} from "react";
import styled from "styled-components";


const _StyledRow = styled.tr`
    width: 100%;
    padding-bottom: 100%;
    border-bottom-style: solid;
    border-bottom-color: grey;
    border-top-style: solid;
    border-top-color: grey;
    border-bottom-width: 2px;
    &:hover {
        background-color: grey;
    }
    
`;

const PlayListRow = (props) => {

    const handleClick = () => {
        console.log("Clicked row ", props.id)
        props.onPlaylistSelect(props.id);
    }


    return (
        <_StyledRow key={props.id} onClick={handleClick}>
            <td>
                <h6>{props.title}</h6>
            </td>
            <td>
                {props.size}
            </td>
        </_StyledRow>
    )

}

export default PlayListRow