import styled from "styled-components";
import {React} from "react";
import {BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs'

const RatingPanel = styled.div`
    color: gold;
`;

const StarRating = (props) => {
    const rating = props.rating;

    const fullStars = Math.floor(rating/2);
    const hashalfstar = (Math.floor(rating/2) < rating/2 && (Math.floor(rating/2) + 1) > rating/2)
    // console.log("rating floor full", Math.floor(rating))
    // console.log("math floor rounded/2: ", Math.round(Math.round(rating) / 2))
    console.log("Ratign: ", rating)
    console.log("Full Stars: ", fullStars);
    // console.log("Has half star: ", hashalfstar)
    // console.log("Empty Stars: ", hashalfstar ? 5 - 1 - fullStars : 5 - fullStars)

    // console.log("empty stars: 5-1-full: ", 5 - 1 - fullStars)
    // console.log("empty stars: 5 -full: ", 5  - fullStars)

    //console.log("Matma mówi: ", hashalfstar ? 5 - 1 - fullStars : (5 - fullStars < 0) ? null : 5 - fullStars)
    console.log("MAJMA")
    console.log("HasHalf: ", hashalfstar)
    //console.log("TRUE:",   Array(5 - 1 - fullStars).length)
    console.log("FALSE: ", Array(5 - fullStars).length)


    return (
        <RatingPanel>
            {Array(fullStars).fill(<BsStarFill />)}
            {hashalfstar ? <BsStarHalf/> : (Math.floor(rating) === 10 ? null : <BsStar/>)}
            {hashalfstar ? 5 - 1 - fullStars > 0 ? Array(5 - 1 - fullStars).fill(<BsStar/>): 2 : Array(5 - fullStars).fill(<BsStar/>)}
        </RatingPanel>

    )
};

export default StarRating;