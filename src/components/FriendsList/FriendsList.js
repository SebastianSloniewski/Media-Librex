import {React, useEffect, useState} from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import FriendRow from "./FriendRow/FriendRow";
import AddFriendPanel from "./AddFriendPanel/AddFriendPanel";


const testFirends = [
    {id: 2, login: "Blablus", email: "abc@bl.bb"},
    {id: 3, login: "Abekus", email: "abc@bl.bb"},
    {id: 4, login: "Ktos to jest", email: "abc@bl.bb"}
]

const _FriendListDiv = styled.div`
    background-color: white;
    width: 300px;
    height: 800px;
`;

const FriendsList = (props) => {
    const [friendsList, setFriendsList] = useState(testFirends);

    console.log("FRIEND LIST: ", props)

    return (
        <_FriendListDiv>
            <AddFriendPanel/>
            <Table>
                <tbody>
                    {friendsList.map((value) => {
                        return <FriendRow friend={value} key={value.id}/>
                    })}
                </tbody>
                
            </Table>
        </_FriendListDiv>
    )

}


export default FriendsList;