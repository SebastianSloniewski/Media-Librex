import React from "react";
import styled from "styled-components";
import { Button, Modal } from "react-bootstrap";



const AddPlaylistModal = (props) => {



    return (
        <Modal show={props.show} onHide={props.closeHandler}>
            <Modal.Header closeButton>
                <Modal.Title>Dodaj Nową Kolekcje</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* TODO zrobić srodek z polem do wpisywania nazwy */}
                <p>tu bedzie zawartosc</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.closeHandler}>
                    Anuluj
                </Button>
                <Button variant="success" onClick={() => {}}>
                    Dodaj
                </Button>
            </Modal.Footer>
        </Modal>


    )


}

export default AddPlaylistModal;