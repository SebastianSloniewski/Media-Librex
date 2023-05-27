import {React, useEffect, useState} from "react";
import styled from "styled-components";
import {HiOutlineUserCircle} from "react-icons/hi"



const FriendRow = (props) => {

    console.log("FRIEND: ", props)

    return (
        <tr>
            <td><HiOutlineUserCircle size={30} style={{marginLeft: "20px"}}/></td>
            <td>{props.friend.login}</td>
        </tr>
    )
}

export default FriendRow;