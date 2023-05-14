import { Button } from "react-bootstrap";
import { LoremIpsum, Avatar } from 'react-lorem-ipsum';
import styled from "styled-components";

import ItemSubDisplay from "../MainDisplayPanel/SubCategoryPanel/ItemSubDisplay/ItemSubDisplay";
import ItemNameField from "./ItemNameField";

const pr = [
    {
        url: "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg", 
        title: "Avatar" 
    }
]

const _ItemView = styled.div`
    height: 100%;
    width: 100%;
    background: #8fd625;
`;

const _ButtonsContainer = styled.div`
    float: right;
    margin-right: 50px;
`;

const _DetailsContainer = styled.div`
    position: relative;
    display: flex;
    min-height: 340px;
`;

const _wraper = styled.div`
    position: absolute;
    transform: scale(1.5);
    top: 60px;
    left: 30px;
`;

const _DescryptionStyle = styled.div`
    position: relative;
    width: calc( 100% - 260px);
    left: 220px;
    padding: 5px 10px 0px 10px;
    text-align: justify;
`;


const _test = styled.div`
    width: 200px;
    height: 200px;
    margin: 20px;
    background-color: black;
`;


const ItemView = (props) => {

    console.log("Item props: ", props)    


    return(
        <>
            <_ItemView className="ItemView">
                <ItemNameField name="Avatar"/>
            
                <_DetailsContainer className="DetailsContainer">
                    
                    <_wraper className="ItemWraper">
                        <ItemSubDisplay key={1} elem={pr[0]}></ItemSubDisplay>
                    </_wraper>
                    
                    <_DescryptionStyle className="Descryption">
                        <LoremIpsum p={2} />
                    </_DescryptionStyle>

                </_DetailsContainer>
                

                <_ButtonsContainer>
                    <Button>Obejrzane</Button>
                    <Button>Dodaj do kolekcji</Button>
                </_ButtonsContainer>
                
            </_ItemView>
        </>
    );
}

export default ItemView;