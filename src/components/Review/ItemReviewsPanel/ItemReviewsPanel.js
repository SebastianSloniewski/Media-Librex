import styled from "styled-components";
import {React} from "react";
import CreateNewReview from "../CreateNewReview/CreateNewReview";
import { useState } from "react";


const ReviewMainPanel = styled.div`
    width: 100%;
    display: flex;
    background-color: blue;
    justify-content: center;
    height: 1000px;
`;


const ItemReviewsPanel = (props) => {
    const [reviewList, setReviewList] = useState([]);

    //console.log("ITEM REV porps", props)

    return(
        <ReviewMainPanel>
            <CreateNewReview
                itemID={props.itemID}
                userData={props.userData}
                mediaType={props.mediaType}
            />

        </ReviewMainPanel>
    )
}

export default ItemReviewsPanel;