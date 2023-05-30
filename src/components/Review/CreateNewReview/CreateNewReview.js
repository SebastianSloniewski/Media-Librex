import styled from "styled-components";
import {React, useState} from "react";


const CreateRevDiv = styled.div`
    background-color: red;
`;


const CreateNewReview = (props) => {
    const [currRevText, setCurrRevText] = useState("");
    const [currScore, setCurrScore] = useState(0);


    console.log("Create new Review props: ", props)

    //zbieranie oceny i tekstu recenzji
    return (
        <div>

            <textarea />
        </div>
    )

}

export default CreateNewReview;