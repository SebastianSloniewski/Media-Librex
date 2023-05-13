import styled from "styled-components";
import {React, useState} from "react";
import ItemSubDisplay from "../MainDisplayPanel/SubCategoryPanel/ItemSubDisplay/ItemSubDisplay";

const _itemGrid = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
`;


const GridItemsPanel = (props) => {
    console.log("GRID PANEL PROPS: ", props);


    return (
        <_itemGrid className="itemGrid">
            {props.items.map((value) => {
                return <ItemSubDisplay key={value.id} elem={value}/>
            })}

        </_itemGrid>
    );
} 

export default GridItemsPanel;