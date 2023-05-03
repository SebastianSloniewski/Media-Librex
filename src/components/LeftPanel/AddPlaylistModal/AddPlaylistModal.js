import React, { useState } from "react";
import styled from "styled-components";
import { Button, Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { getAllBooks } from "../../../Axios/MLAxios";
import { getBooksByName } from "../../../Axios/MLAxiosBooks";



const AddPlaylistModal = (props) => {
    const [currName, setCurrName] = useState("");


    const addNewPlaylist = () => {
        const newPlaylist = {
            title: currName,
            size: 0,
            plId: 10,
            elems: []
        }
        setCurrName("")

        // console.log("################################################################################################################")
        // console.log("testing connection");
        // const testresult = getBooksByName("Beer");
        // console.log(testresult)

        props.addPlaylist(newPlaylist);
        props.closeHandler();
    }

    const handleChange = (e) => {
        setCurrName(e.target.value)
    }


    return (
        <Modal show={props.show} onHide={props.closeHandler}>
            <Modal.Header closeButton>
                <Modal.Title>Dodaj Nową Kolekcje</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* TODO zrobić srodek z polem do wpisywania nazwy */}
                <p>Jak chcesz nazwać swoją nową kolekcję?</p>
                <Form.Control type="text" 
                    placeholder="Nazwa kolekcji" 
                    style={{width: "80%"}}
                    value={currName}
                    onChange={handleChange}
                    />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="neutral" onClick={props.closeHandler}>
                    Anuluj
                </Button>
                <Button variant="success" onClick={addNewPlaylist}>
                    Dodaj
                </Button>
            </Modal.Footer>
        </Modal>


    )


}

export default AddPlaylistModal;