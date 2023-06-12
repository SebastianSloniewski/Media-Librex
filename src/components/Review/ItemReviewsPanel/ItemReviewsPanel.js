import styled from "styled-components";
import {React} from "react";
import CreateNewReview from "../CreateNewReview/CreateNewReview";
import { useState } from "react";
import ReviewPanel from "../ReviewPanel/ReviewPanel";
import { useEffect } from "react";
import { getItemReviews } from "../../../Axios/MLAxiosReview";


const ReviewMainPanel = styled.div`
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 400px;
`;

const ReviewsContainer = styled.div`
    justify-content: center;
    align-items: center;
    height: 110%;
    padding: 20px;
`;
const ItemReviewsPanel = (props) => {
    const [reviewList, setReviewList] = useState(props.reviews);

    //console.log("ITEM REV porps", props)

    useEffect(() => {
        const reviewResp = getItemReviews(props.itemID);

        reviewResp.then((resolve) => {
            setReviewList(resolve);
            //console.log("FETCHED: ", resolve)
        }, () => {
            //console.log("Failed to get reviews");
        })
    }, [])
    

    return(
        <ReviewMainPanel className="ReviewMainPanel">
            <CreateNewReview
                itemID={props.itemID}
                userData={props.userData}
                mediaType={props.mediaType}
            />
            <ReviewsContainer>
                {reviewList.map((value) => 
                    <ReviewPanel 
                        key={value.id}
                        reviewData={value}
                    />
                )}
            </ReviewsContainer>
           


        </ReviewMainPanel>
    )
}

export default ItemReviewsPanel;