import {React, useState} from "react";
import { Button, Modal, Table } from "react-bootstrap";
import styled from "styled-components";
import PlayListRow from "../../LeftPanel/PlaylistRow/PlayListRow";


const AddToPlaylistModal = (props) => {
    const [playLists, setPlayLists] = useState(props.playlists);

    console.log("MODAL PROPS: ", props)

    const handleSelectPlaylist = (id) => {
        //console.log("handling pl select modal: ", id)
        props.handleAdding(id);
        
    }

    return (
        <Modal show={props.show} onHide={props.closeHandler}>
            <Modal.Header >
                <Modal.Title>Wybierz Playliste</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table bordered={false}>
                    <tbody>
                        {props.playlists.map((value) => <PlayListRow
                            title={value.name}
                            size={value.mediaListItems.length === undefined ? 0 : value.mediaListItems.length}
                            id={value.id}
                            key={value.id}
                            onPlaylistSelect={handleSelectPlaylist}
                        />)}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="neutral" onClick={props.closeHandler}>
                    Cofnij
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddToPlaylistModal;