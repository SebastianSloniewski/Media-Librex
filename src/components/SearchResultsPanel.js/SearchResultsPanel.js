import styled from "styled-components";
import {React, useState} from "react";
import GridItemsPanel from "../GridItemsPanel/GridItemsPanel";

const _SearchPanel = styled.div`
    position: absolute;
    max-width: vw;
    width: 100%;
    background-color: yellow;
    text-align: center;
`;

const searchHeaderStyle = {
    position: "sticky",
    top: "277px",
    width: "calc(100vw - 320px)",
    background: "yellow",
    zIndex: "1"


};

const gridPanelStyle={
    position: "relative",
    top: "20px"
};


const SearchResultsPanel = (props) => {
    console.log("SearchResPanel PROPS: ", props)

    return (
            <_SearchPanel className="__search_panel">

            <div style={searchHeaderStyle} className="search_header">
                {props.items.length === undefined || props.items.length === 0 ? 
                    <h2>No Results for "{props.query}"</h2> 
                    :
                    <h2>Search results for "{props.query}"</h2>
                }
            </div>
            <div style={gridPanelStyle}>
                <GridItemsPanel items={props.items} itemSwitch={(elem) => props.itemSwitch(elem)}/>
            </div>

            </_SearchPanel>
    )

}

export default SearchResultsPanel;