import styled from "styled-components";
import {React} from "react";
import {BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs'

const RatingPanel = styled.div`
    color: gold;
`;
//TODO NAPRAWA MATMY
const StarRating = (props) => {
    let rating = props.rating;

    console.log("STARS: ", rating)
    if(props.rating === undefined)
        rating = 0;

    const fullStars = Math.floor(rating/2);
    console.log("FULL: ", fullStars)


    const hashalfstar = (Math.floor(rating/2) < rating/2 && (Math.floor(rating/2) + 1) > rating/2)
    console.log("HAS Half: ", hashalfstar)
   

    return (
        <RatingPanel>
            {Array(fullStars).fill(<BsStarFill />)}
            {hashalfstar ? <BsStarHalf/> : null}
            {hashalfstar ? 5 - 1 - fullStars > 0 ? Array(5 - 1 - fullStars).fill(<BsStar/>): 2 : Array(5 - fullStars).fill(<BsStar/>)}
        </RatingPanel>

    )
};

export default StarRating;