import {React, useState} from "react";
import styled from "styled-components";
//import examplePic from "./imgs/Items/Movies/thankskilling.jpg" 
import {BsXLg} from "react-icons/bs"
import StarRating from "../../../StarRating/StarRating";
import { useEffect } from "react";
import { getReviewScoreAvg } from "../../../../Axios/MLAxiosReview";


const ItemContainer = styled.div`
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 0 10px 0 10px;
    padding: 10px;
`;
const TitleContainer = styled.div`
    margin-top: 20px;
    margin: auto;
    width: 50%;
    max-width: ${({mediaType}) =>
        mediaType === '' && '280px' || 
        mediaType === 'book' && '280px' ||
        '1services80px'
    };
`;

const DeletionContainer = styled.div`
    color: red;
    display: flex;
    justify-content: right;
`;

const ItemSubDisplay = (props) => {
    const elem = props.elem;
    const [rating, setRating] = useState(5);
    
    

    useEffect(() => {
        const reviewAVG = getReviewScoreAvg(elem.id)
        //console.log("EFFECT SUBDISP", reviewAVG)

        reviewAVG.then((resolve) => {
            if(resolve !== '' && resolve !== undefined){
                setRating(resolve);
                console.log("GOT DATA: ", rating)
            }
            
        }, () => {
            console.log("Failed to get item " + elem.id + " rating")
        })

        //setRating(reviewAVG)
    }, [elem.id])

    //console.log("rendered item")
    const onClickFunction = () => props.itemSwitch(elem);

    return (
        <ItemContainer>
            
            {props.isDeletable !== undefined && props.isDeletable === true  && props.handleDelete !== undefined ?
                <DeletionContainer onClick={() => props.handleDelete(elem.id)}>
                    <BsXLg size={20}/>
                </DeletionContainer>
            :
                <div></div>
            }
            <img src={elem.url} alt="indyk" style={{height: "280px"}} onClick={onClickFunction}/>
            { <TitleContainer 
                onClick={onClickFunction}
                mediaType = {props.mediaType}>
                <h6>{elem.title}</h6>

            </TitleContainer>}
            {/* POTRZEBA OBSLUGI PO STRONIE BACKENDU */}
            <StarRating rating={rating}/>
            


        </ItemContainer>
    )

}

export default ItemSubDisplay;