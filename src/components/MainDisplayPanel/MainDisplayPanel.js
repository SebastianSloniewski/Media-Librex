import styled from "styled-components";
import {React, useState} from "react";
import SubCategoryPanel from './SubCategoryPanel/SubCategoryPanel';

const _MainDisplayContainer = styled.div`
    possition: fixed;
    width: 100%;
    height: calc(100% - 30px);
    background-color: red;
    margin-top: 80px;
    padding-top: 50px; 
`;



const MainDisplayPanel = (props) => {
    const [subCategories, setSubCategories] = useState(props.subCategories);
    //const [subCategories, setSubCategories] = useState([]);

    console.log("rendered main display panel of " + props.type);

    return (
        <_MainDisplayContainer className="MainDisplayPanel">
            <h1>Tu beda kategorie</h1>
            {subCategories.map((value) => {
                console.log("rendering subcategory in map")
                return (<SubCategoryPanel category={value}/>)
            })}

        </_MainDisplayContainer>
    );
}

export default MainDisplayPanel;