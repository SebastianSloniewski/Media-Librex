import {React, useEffect, useState} from "react";
import styled from "styled-components";
import FriendsList from "../FriendsList/FriendsList";

const _MainContainer = styled.div`
    display: flex;
`;

const _UserDataDiv = styled.div`
    display: block;
    background-color: green;
`;


const UserProfile = (props) => {

    console.log("USER PROF: ", props)


    return (
        <_MainContainer>
            <img src="https://m.media-amazon.com/images/M/MV5BMTYwNDMzODI0Ml5BMl5BanBnXkFtZTgwNzMzODQyOTE@._V1_SX300.jpg" alt="profile"/>
            <_UserDataDiv>
                <p>Login: {props.userData.login}</p>
                <p>Email: {props.userData.email}</p>
            </_UserDataDiv>

            <FriendsList/>
        
        </_MainContainer>
    )

}

export default UserProfile;