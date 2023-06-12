import styled from "styled-components";
import {React, useState} from "react";
import ItemSubDisplay from "./ItemSubDisplay/ItemSubDisplay";

const _subCategorypanel = styled.div`
    background-color: white;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    padding: 20px;
`;

const _subCategoryView = styled.div`
    
`

const SubCategoryPanel = (props) => {
    const [displayedItems, setDisplayedItems] = useState(props.category.elements);

    //console.log("RenderingSubCategoryPanel: ", props)

    return (
       <_subCategoryView>
            <h1>{props.category.title}</h1>
            <_subCategorypanel >
                {displayedItems.map((value, id) => {
                    //console.log(value.title)
                    return <ItemSubDisplay key={id} elem={displayedItems[id]} itemSwitch={props.itemSwitch}/>
                })}
            </_subCategorypanel>
       </_subCategoryView> 
        
    );
}

export default SubCategoryPanel;