import { useState } from 'react';
import {React} from 'react'
import styled from "styled-components";
import StarRating from '../../StarRating/StarRating';

const _reviewDiv = styled.div`
    background-color: green;
    height: 200px;
    width: 80%;
    margin-top: 30px;
    margin-bottom: 30px;
`


const ReviewPanel = (props) => {
    const [reviewData, setReviewData] = useState(props.reviewData)
    console.log("RECENZJA", props)


    return (
        <_reviewDiv>
            <StarRating rating={reviewData.reviewScore}/>
            <div>{reviewData.reviewText}</div>
            <div>Napisane przez: {reviewData.user.name}</div>
            
        </_reviewDiv>

    )
}

export default ReviewPanel