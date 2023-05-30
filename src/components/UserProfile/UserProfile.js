import {React, useEffect, useState} from "react";
import styled from "styled-components";
import FriendsList from "../FriendsList/FriendsList";
import PlayListRow from "../LeftPanel/PlaylistRow/PlayListRow";
import { createCollection, deleteCollection } from "../../Axios/MLAxiosPlaylists";

const _MainContainer = styled.div`
    display: flex;
    gap: 40px;
    padding: 15px;
`;

const _UserDataDiv = styled.div`
    display: block;
    padding: 10px;
    font-weight: bold;
    //background-color: green;
`;

const _profilePicture = styled.img`
    border-radius: 50%;
    width: 180px;
    height: 180px;
`
const _profileInfo = styled.div`
    flex: 1;
    text-align: center;
`
const _friendsPanel=styled.div`
    flex: 2;
    width:300px;
    
`

const _userPlaylists=styled.div`
    flex:2;
`



function FriendsPanel(){
    return(
        <_friendsPanel className="FriendsPanel">
            <h1 style={{textAlign: "center"}}>Friends</h1>
            <FriendsList/>
        </_friendsPanel>
    );
}

function UserPlaylists(props){
    const [playlists, setPlayLists] = useState(props.userPlaylists);
    const [isAddPanelOpen, setIsPanelOpen] = useState(false);
    
    

    useEffect(() => {
        //console.log("effects playlists")
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

        //console.log("Adding new playlist")
    }

    const handleDeletePlaylist = (id) => {
        const newList = playlists.filter(pl => pl.id !== id);
        setPlayLists(newList);
        deleteCollection(id);
        //console.log("DELETION")

        //props.handleDeletePlaylist(id);
    }
    return(
        <_userPlaylists>
            <h1 style={{textAlign: "center"}}>Playlists</h1>
            
        </_userPlaylists>
    );
}

const UserProfile = (props) => {

    console.log("USER PROF: ", props)


    return (
        <_MainContainer className="UserView">

            <_profileInfo>
                <h1 style={{textAlign: "center"}}>User</h1>
                <_profilePicture src="https://m.media-amazon.com/images/M/MV5BMTYwNDMzODI0Ml5BMl5BanBnXkFtZTgwNzMzODQyOTE@._V1_SX300.jpg" alt="profile"/>
                <_UserDataDiv>
                    <p>Login: {props.userData.login}</p>
                    <p>Email: {props.userData.email}</p>
                </_UserDataDiv>
            </_profileInfo>

            <UserPlaylists
                userPlaylists={props.plList}
            />
            <FriendsPanel/>

        </_MainContainer>
    )

}

export default UserProfile;