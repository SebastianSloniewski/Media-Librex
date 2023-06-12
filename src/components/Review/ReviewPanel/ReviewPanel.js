import { useState } from 'react';
import {React} from 'react'
import styled from "styled-components";
import StarRating from '../../StarRating/StarRating';

const _reviewDiv = styled.div`
    width: 100%;
    border: solid;
    border-color: #DBDBDB;
    border-radius: 10px;
    max-height: 200px;
    padding: 10px;
    margin: 8px 0 8px 0;
`

const ReviewPanel = (props) => {
    const [reviewData, setReviewData] = useState(props.reviewData)
    console.log("RECENZJA", props)


    return (
        <_reviewDiv className="Reviews">
            <StarRating rating={reviewData.reviewScore}/>
            <div>{reviewData.reviewText}</div>
            <div 
                style={{fontSize:"15px", 
                        color:"#8D8D8D"}}>
                        Napisane przez: {reviewData.user.name}</div>
            
        </_reviewDiv>

    )
}

export default ReviewPanel