import {React, useState} from "react";
import styled from "styled-components";
import {BsXLg} from "react-icons/bs"


const _StyledRow = styled.tr`
    width: 100%;
    padding-bottom: 100%;
    border-bottom-style: solid;
    border-bottom-color: grey;
    border-top-style: solid;
    border-top-color: grey;
    border-bottom-width: 2px;
    &:hover {
        color: green;
    }
    
`;

const _Xcontainer = styled.div`
    color: black;

    &:hover{
        color: red;
    }
`;

const PlayListRow = (props) => {
    

    //console.log("ROW PROPS: ", props)

    const handleClick = () => {
        //console.log("Clicked row ", props.id)
        props.onPlaylistSelect(props.id);
    }


    return (
        <_StyledRow key={props.id}>
            <td onClick={handleClick}>
                <h6>{props.title}</h6>
            </td>
            <td onClick={handleClick}>
                {props.size}
            </td>
            {
                props.isDeletable ? 
            <td>
                <_Xcontainer onClick={() => props.onPlaylistDelete(props.id)}>
                    <BsXLg size={15}/>
                </_Xcontainer>
            </td>
            :
            <td>

            </td>
            }
            
        </_StyledRow>
    )

}

export default PlayListRow