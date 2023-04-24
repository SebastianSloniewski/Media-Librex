import {React, useState} from "react";
import styled from "styled-components";

const ItemContainer = styled.div`
    background-color: blue;
`;


const ItemSubDisplay = (props) => {
    console.log("rendered item")

    return (
        <ItemContainer>
            <img src="src\imgs\Items\Movies\thankskilling.jpg"/>
            <h6>Tytul</h6>
            <img />


        </ItemContainer>
    )

}

export default ItemSubDisplay;