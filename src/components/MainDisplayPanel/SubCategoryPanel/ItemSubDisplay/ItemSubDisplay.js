import {React, useState} from "react";
import styled from "styled-components";
//import examplePic from "./imgs/Items/Movies/thankskilling.jpg" 
import WebImage from "../../../WebImage/WebImage";
import thankskilling from "../../../../imgs/thankskilling.jpg"
import StarRating from "../../../StarRating/StarRating";
import UrlImage from "../../../../UI/UrlImage";

const ItemContainer = styled.div`
    //background-color: blue;
    margin-left: 20px;
    width: auto;
    align-items: center;
    justify-content: center;
    text-align: center;
`;
const TitleContainer = styled.div`
    margin-top: 20px;
`;

const ItemSubDisplay = (props) => {
    //console.log("rendered item")
    const elem = props.elem;
    const onClickFunction = () => props.itemSwitch(elem);

    return (
        <ItemContainer onClick={onClickFunction}>
            {/* <img src={thankskilling} alt="indyk" style={{height: "150px"}}/> */}
            {/* <UrlImage src={"https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg"} alt="itemImage" style={{height: "150px"}}/> */}
            <img src={elem.url} alt="indyk" style={{height: "150px"}}/>
            <TitleContainer>
                <h6>{elem.title}</h6>
            </TitleContainer>
            {/* POTRZEBA OBSLUGI PO STRONIE BACKENDU */}
            {/* <StarRating rating={elem.rating}/> */}


        </ItemContainer>
    )

}

export default ItemSubDisplay;