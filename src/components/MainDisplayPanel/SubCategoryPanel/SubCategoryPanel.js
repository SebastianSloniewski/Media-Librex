import styled from "styled-components";
import {React, useState} from "react";
import ItemSubDisplay from "./ItemSubDisplay/ItemSubDisplay";

const _subCategorypanel = styled.div`
    background-color: white;
    width: 100%;
    height: 200px;
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
`;

const SubCategoryPanel = (props) => {
    const [displayedItems, setDisplayedItems] = useState(props.category.elements);

    //console.log("RenderingSubCategoryPanel: ", props)

    return (
       <div>
            <h1>{props.category.title}</h1>
            <_subCategorypanel>
                
                {/* TODO strzaleczki do przelaczania lewo/prawo, 
                wyswietlanie X elementow listy w poziomie */}
                {displayedItems.map((value, id) => {
                    //console.log(value.title)
                    return <ItemSubDisplay key={id} elem={displayedItems[id]}/>
                })}
            </_subCategorypanel>
       </div> 
        
    );
}

export default SubCategoryPanel;