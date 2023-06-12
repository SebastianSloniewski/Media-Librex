import React, { useState } from "react";
import styled from "styled-components";
import { Button, Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { getAllBooks } from "../../../Axios/MLAxios";
import { getBooksByName } from "../../../Axios/MLAxiosBooks";
import { testUser } from "../../../App";



const AddPlaylistModal = (props) => {
    const [currName, setCurrName] = useState("");


    const addNewPlaylist = () => {
        const newPlaylist = {
            id: null,
            name: currName,
            creationDate: null,
            lastUpdateDate: null,
            users: [props.currentUser],
            mediaListItems: []
        }
        setCurrName("")

        props.addPlaylist(newPlaylist);
        props.closeHandler();
    }

    const handleChange = (e) => {
        setCurrName(e.target.value)
    }


    return (
        <Modal show={props.show} onHide={props.closeHandler}>
            <Modal.Header closeButton>
                <Modal.Title>Add new Collection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Choose name for your new collection</p>
                <Form.Control type="text" 
                    placeholder="Nazwa kolekcji" 
                    style={{width: "80%"}}
                    value={currName}
                    onChange={handleChange}
                    />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="neutral" onClick={props.closeHandler}>
                    Cancel
                </Button>
                <Button variant="success" onClick={addNewPlaylist}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>


    )


}

export default AddPlaylistModal;