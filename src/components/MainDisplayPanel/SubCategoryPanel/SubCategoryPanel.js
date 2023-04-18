import styled from "styled-components";
import {React, useState} from "react";

const _subCategorypanel = styled.div`
    background-color: white;
    width: 100%;
    height: 200px;
    margin-top: 50px;
`;

const SubCategoryPanel = (props) => {

    console.log("RenderingSubCategoryPanel: ", props)

    return (
        <_subCategorypanel>
            <h1>{props.category.title}</h1>
            {/* TODO strzaleczki do przelaczania lewo/prawo, 
            wyswietlanie X elementow listy w poziomie */}
            <span>tu bedzie lista</span>
        </_subCategorypanel>
    );
}

export default SubCategoryPanel;