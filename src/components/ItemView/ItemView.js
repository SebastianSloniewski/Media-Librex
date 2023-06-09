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
import { getUserDefaultCollection, updateCollection } from "../../Axios/MLAxiosPlaylists";
import ItemReviewsPanel from "../Review/ItemReviewsPanel/ItemReviewsPanel";
import { getItemReviews } from "../../Axios/MLAxiosReview";


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
    display: flex;
    min-height: 340px;
`;

const _wraper = styled.div`
    transform: scale(1.5);
    margin-top: 75px;
    padding: 5px;
    flex: 1;
`;

const _DescryptionStyle = styled.div`
    width: calc( 100% - 260px);
    left: 220px;
    padding: 5px 10px 0px 10px;
    text-align: justify;
    flex: 3;
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
    const [itemReviews, setItemReviews] = useState([])

    //console.log("Item props: ", props)
    //console.log("ELEM DATA ", elemData)
    
    //wywolywany przy 1 renderze do zebrania danych pelnych i recenzju
    useEffect(() => {
        if(!hasFullData){
            //console.log("CALL FOR FULL DATA")
            getFullData(elemData.mediaType, elemData.id);
            //console.log(elemData)
        }
        
        const reviewResp = getItemReviews(elemData.id);

        reviewResp.then((resolve) => {
            setItemReviews(resolve);
        }, () => {
            console.log("Failed to get reviews");
        })


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
        console.log("Dane Itemu");
        console.log(props.basicElem);
    }

    const openATPPanel = () => {
        setIsAddToPlaylistOpen(true);
    }

    const closeATPPanel = () => {
        setIsAddToPlaylistOpen(false);
    }

    
    const handleAddToPlaylist = (id) => {
        closeATPPanel()
        console.log("ADD to playlist ID, ", id)

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
            listPositionIndex: selectedPlaylist.mediaListItems.length !== undefined ? selectedPlaylist.mediaListItems.length : 0,
            dateAdded: undefined,
            mediaItem: mediaItem
        }
        
        console.log("Mitem: ", mediaItem)

        selectedPlaylist.mediaListItems = [...selectedPlaylist.mediaListItems, mediaItemDTO]
        console.log("SEL PL: ", selectedPlaylist) 

        updateCollection(id, selectedPlaylist);
    }

    const handleAddToDefault = (ItemID, UserID) => {
        
        const uID = props.userData.id;
        console.log("ADDING TO DEFAULT!: ", uID)


        const defaultC = getUserDefaultCollection(uID)
        console.log("DEF: ", defaultC)

        defaultC.then((resolve) => {
            handleAddToPlaylist(resolve.id)

        }, () => {

        })


    }

    return(
        <>
            <_ItemView className="ItemView">
                <ItemNameField name={elemData.title}/>
            
                <_DetailsContainer className="DetailsContainer">
                    
                    
                    <ItemSubDisplay key={1}
                    elem={props.basicElem}
                    itemSwitch={() => {}}
                    />
                 
                    
                    <_DescryptionStyle className="Descryption">
                        <LoremIpsum p={2} />
                    </_DescryptionStyle>

                </_DetailsContainer>
                

                <_ButtonsContainer>
                    <Button onClick={handleAddToDefault}>Obejrzane</Button>
                    <Button onClick={openATPPanel}>Dodaj do kolekcji</Button>
                </_ButtonsContainer>

                <AddToPlaylistModal
                    show={isAddToPlaylistOpen}
                    closeHandler={closeATPPanel}
                    playlists={props.playlists}
                    handleAdding={handleAddToPlaylist}
                />

                
            </_ItemView>

            <ItemReviewsPanel 
                userData={props.userData}
                itemID={props.basicElem.id}
                mediaType={props.basicElem.mediaType}
            />
        </>
    );
}

export default ItemView;