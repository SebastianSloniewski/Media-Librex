import styled from "styled-components";
import {React} from "react";
import CreateNewReview from "../CreateNewReview/CreateNewReview";
import { useState } from "react";


const ReviewMainPanel = styled.div`
    width: 100%;
    background-color: blue;
    
`;


const ItemReviewsPanel = (props) => {
    const [reviewList, setReviewList] = useState([]);

    console.log("ITEM REV porps", props)

    return(
        <ReviewMainPanel>
            <CreateNewReview/>

        </ReviewMainPanel>
    )
}

export default ItemReviewsPanel;