import styled from "styled-components";
import {React, useState} from "react";
import { Button, Form } from "react-bootstrap";
import { createReview } from "../../../Axios/MLAxiosReview";
import Select from "react-select";


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

const scoreOptions = [
    {value: 1, label: "1"},
    {value: 2, label: "2"},
    {value: 3, label: "3"},
    {value: 4, label: "4"},
    {value: 5, label: "5"},
    {value: 6, label: "6"},
    {value: 7, label: "7"},
    {value: 8, label: "8"},
    {value: 9, label: "9"},
    {value: 10, label: "10"}

]

const CreateNewReview = (props) => {
    const [currRevText, setCurrRevText] = useState("");
    const [currScore, setCurrScore] = useState(1);


    const handleTextChange = (e) => {
        setCurrRevText(e.target.value);
    }

    const handleScoreChange = (score) => {
        console.log("Changing score to ", score)
        setCurrScore(score.value);
    }

    //console.log("Create new Review props: ", props)


    const publishReview = () => {

        const ReviewDTO = {
            reviewText: currRevText,
            reviewScore: currScore,
            mediaItemId: props.itemID,
            mediaItemType: props.mediaType,
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
            <Select 
                options={scoreOptions}
                placeholder={"Ocen Item"}
                value={currScore}
                onChange={handleScoreChange}
            />

            <Button onClick={publishReview}>Opublikuj Recenzje</Button>
            
            
        </CreateRevDiv>
    )

}

export default CreateNewReview;