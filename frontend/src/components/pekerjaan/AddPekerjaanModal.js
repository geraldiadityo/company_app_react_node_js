import React, {Fragment, useState} from "react";
import { Button, Modal, ModalHeader, ModalBody } from "react-bootstrap";
import PekerjaanAdd from "./AddPekerjaan";

const AddPekerjaanModal = (props) => {
    const [modal, setModal] = useState(false);
    
    const toggle = () => {
        setModal(state => !state);
    }

    return (
        <Fragment>
            <Button onClick={toggle}>Upload</Button>
            <Modal show={modal} onHide={toggle}>
                <ModalHeader closeButton>
                    Upload Pekerjaan
                </ModalHeader>
                <ModalBody>
                    <PekerjaanAdd resetState={props.resetState}
                    toggle={toggle}
                    toggleNotif={props.toggleNotif}
                    setMessageNotif={props.setMessageNotif}
                    />
                </ModalBody>
            </Modal>
        </Fragment>
    );
};

export default AddPekerjaanModal;