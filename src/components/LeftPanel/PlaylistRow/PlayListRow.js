import {React, useState} from "react";
import styled from "styled-components";


const styledRow = styled.tr`
    border: none;
    border-top: none;
`;

const PlayListRow = (props) => {


    return (
        <tr key={props.key}>
            <td>
                {props.title}
            </td>
            <td>
                {props.size}
            </td>
        </tr>
    )

}

export default PlayListRow