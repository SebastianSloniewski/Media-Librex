import styled from "styled-components";
import {React, useState} from "react";
import GridItemsPanel from "../GridItemsPanel/GridItemsPanel";

const _SearchPanel = styled.div`
    width: 100%;
    background-color: yellow;
    margin-top: 90px;
    text-align: center;
`;


const SearchResultsPanel = (props) => {
    console.log("SearchResPanel PROPS: ", props)

    return (
        <_SearchPanel>
            {props.items.length === undefined || props.items.length === 0 ? 
                <h2>No Results for "{props.query}"</h2> 
                :
                <h2>Search results for "{props.query}"</h2>
            }
            <GridItemsPanel items={props.items}/>

        </_SearchPanel>
    )

}

export default SearchResultsPanel;