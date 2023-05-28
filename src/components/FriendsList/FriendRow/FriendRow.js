import {React, useEffect, useState} from "react";
import styled from "styled-components";
import {HiOutlineUserCircle} from "react-icons/hi"
import {BsXLg} from "react-icons/bs"

const deletionContainer = styled.td`
    width: 10%;
    color: red;
`;
const NameContainer = styled.td`
    width: 80%;
`; 
const UserIconContainer = styled.td`
    width: 10%;
`; 



const FriendRow = (props) => {

    console.log("FRIEND: ", props)

    return (
        <tr>
            <UserIconContainer><HiOutlineUserCircle size={30} style={{marginLeft: "20px"}}/></UserIconContainer>
            <NameContainer>{props.friend.login}</NameContainer>
            <deletionContainer><BsXLg/></deletionContainer>
        </tr>
    )
}

export default FriendRow;