import styled from "styled-components";
import {React, useState} from "react";
import { Button, Form } from "react-bootstrap";
import { createReview } from "../../../Axios/MLAxiosReview";


const CreateRevDiv = styled.div`
    background-color: red;
    width: 80%;
    height: 300px;
    //margin-top: 30px;
    padding-top: 50px;
`;

const _textAreaDiv = styled.div`
    display:flex;
    justify-content: center;
    width: 80%;
`;


const CreateNewReview = (props) => {
    const [currRevText, setCurrRevText] = useState("");
    const [currScore, setCurrScore] = useState(10);


    const handleTextChange = (e) => {
        setCurrRevText(e.target.value);
    }

    //console.log("Create new Review props: ", props)


    const publishReview = () => {

        const ReviewDTO = {
            id: null,
            creationDate: null,
            lastUpdateDate: null,
            reviewText: currRevText,
            reviewScore: currScore,
            mediaItemId: props.itemID,
            mediaItemType: props.mediaType,
            user: props.userData
        }
        console.log("SENDING DATA:", ReviewDTO)
        createReview(props.itemID, ReviewDTO, props.userData.id)

    }


    //zbieranie oceny i tekstu recenzji
    return (
        <CreateRevDiv>
            <h3>Napisz Recenzje</h3>

            <_textAreaDiv>
                <Form.Control 
                    as="textarea"
                    rows={3}
                    onChange={handleTextChange}
                />
            </_textAreaDiv>
            <Button onClick={publishReview}>Opublikuj Recenzje</Button>
            
            
        </CreateRevDiv>
    )

}

export default CreateNewReview;