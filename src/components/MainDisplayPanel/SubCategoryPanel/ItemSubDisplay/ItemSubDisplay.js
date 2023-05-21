import {React, useState} from "react";
import styled from "styled-components";
//import examplePic from "./imgs/Items/Movies/thankskilling.jpg" 
import {BsXLg} from "react-icons/bs"

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

const DeletionContainer = styled.div`
    color: red;
    display: flex;
    justify-content: right;
`;

const ItemSubDisplay = (props) => {
    //console.log("rendered item")
    const elem = props.elem;
    const onClickFunction = () => props.itemSwitch(elem);

    return (
        <ItemContainer>
            
            {props.isDeletable !== undefined && props.isDeletable === true  && props.handleDelete !== undefined ?
                <DeletionContainer onClick={() => props.handleDelete(elem.id)}>
                    <BsXLg size={20}/>
                </DeletionContainer>
            :
                <div></div>
            }
            <img src={elem.url} alt="indyk" style={{height: "150px"}} onClick={onClickFunction}/>
            <TitleContainer onClick={onClickFunction}>
                <h6>{elem.title}</h6>
            </TitleContainer>
            {/* POTRZEBA OBSLUGI PO STRONIE BACKENDU */}
            {/* <StarRating rating={elem.rating}/> */}


        </ItemContainer>
    )

}

export default ItemSubDisplay;