import {React, useState} from "react";
import styled from "styled-components";
//import examplePic from "./imgs/Items/Movies/thankskilling.jpg" 
import WebImage from "../../../WebImage/WebImage";
import thankskilling from "../../../../imgs/thankskilling.jpg"
import StarRating from "../../../StarRating/StarRating";

const ItemContainer = styled.div`
    //background-color: blue;
    margin-left: 20px;
    width: 200px;
    align-items: center;
    justify-content: center;
    text-align: center;
`;
const ImgContainer = styled.img`
    height: 100px;
    width: 60px;
`;

const ItemSubDisplay = (props) => {
    console.log("rendered item")
    const elem = props.elem;


    return (
        <ItemContainer>
            <img src={thankskilling} alt="indyk" style={{height: "150px"}}/>
            <h6>{elem.title}</h6>
            <StarRating rating={elem.rating}/>


        </ItemContainer>
    )

}

export default ItemSubDisplay;