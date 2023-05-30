import { Button } from "react-bootstrap";
import { LoremIpsum, Avatar } from 'react-lorem-ipsum';
import styled from "styled-components";

import ItemSubDisplay from "../MainDisplayPanel/SubCategoryPanel/ItemSubDisplay/ItemSubDisplay";
import ItemNameField from "./ItemNameField";
import { useEffect, useState } from "react";
import { ElemType, MainDisplayType } from "../../utils/dataTypes";
import { getMovieById } from "../../Axios/MLAxiosFilms";
import { getMusicByID } from "../../Axios/MLAxiosMusic";
import { getBookByID } from "../../Axios/MLAxiosBooks";
import AddToPlaylistModal from "./AddToPlaylistModal/AddToPlaylistModal";
import { updateCollection } from "../../Axios/MLAxiosPlaylists";


const _ItemView = styled.div`
    height: 100%;
    width: 100%;
    //background: #8fd625;
    background-color: white;
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
    const [elemData, setElemData] = useState(props.basicElem);
    const [hasFullData, setHasFullData] = useState(false);
    const [isAddToPlaylistOpen, setIsAddToPlaylistOpen] = useState(false);

    //console.log("Item props: ", props)
    //console.log("ELEM DATA ", elemData)
    
    //wywolywany przy 1 renderze do zebrania danych pelnych
    useEffect(() => {
        if(!hasFullData){
            //console.log("CALL FOR FULL DATA")
            getFullData(elemData.mediaType, elemData.id);
            //console.log(elemData)
        }
        
    }, [elemData, hasFullData])

    const getFullData = async (type, id) => {
        let result = {}
        //console.log("Fetching for: ", type)

        switch(type){
            case ElemType.Movie:
                const filmPromise = await getMovieById(id);

                result = filmPromise;

 
                break;
            case ElemType.Tv:
                const seriesPromise = await getMovieById(id);

                result = seriesPromise;

                break;
            case ElemType.Music:
                const musicPromise = await getMusicByID(id);

                result = musicPromise;

                break;
            case ElemType.Book:
                const bookPromise = await getBookByID(id);
                //TODO okladka

                result = bookPromise;


                break;

            default:
                //console.log("Error with data fetching")

        }

        //console.log("RESULT: ", result);

        setHasFullData(true);
        setElemData(result);
    }

    const openATPPanel = () => {
        setIsAddToPlaylistOpen(true);
    }

    const closeATPPanel = () => {
        setIsAddToPlaylistOpen(false);
    }

    
    const handleAddToPlaylist = (id, isAddingToWatched = false) => {
        closeATPPanel()
        console.log("ADD to playlist IV, ", id)

        const mediaItem = {
            id: elemData.id,
            title: elemData.title,
            people: elemData.people,
            covers: elemData.covers,
            mediaType: elemData.mediaType,
            subjects: elemData.subjects,
            year: elemData.year
        }

        let selectedPlaylist = props.playlists.filter(pl => pl.id === id)[0];

        const mediaItemDTO = {
            id: undefined,
            listPositionIndex: selectedPlaylist.mediaListItems.length,
            dateAdded: undefined,
            mediaItem: mediaItem
        }
        
        console.log("Mitem: ", mediaItem)

        selectedPlaylist.mediaListItems = [...selectedPlaylist.mediaListItems, mediaItemDTO]
        console.log("SEL PL: ", selectedPlaylist) 

        updateCollection(id, selectedPlaylist);

    }

    return(
        <>
            <_ItemView className="ItemView">
                <ItemNameField name={elemData.title}/>
            
                <_DetailsContainer className="DetailsContainer">
                    
                    <_wraper className="ItemWraper">
                        <ItemSubDisplay key={1}
                        elem={props.basicElem}
                        itemSwitch={() => {}}
                        />
                    </_wraper>
                    
                    <_DescryptionStyle className="Descryption">
                        <LoremIpsum p={2} />
                    </_DescryptionStyle>

                </_DetailsContainer>
                

                <_ButtonsContainer>
                    <Button>Obejrzane</Button>
                    <Button onClick={openATPPanel}>Dodaj do kolekcji</Button>
                </_ButtonsContainer>

                <AddToPlaylistModal
                    show={isAddToPlaylistOpen}
                    closeHandler={closeATPPanel}
                    playlists={props.playlists}
                    handleAdding={handleAddToPlaylist}
                />

                
            </_ItemView>
        </>
    );
}

export default ItemView;