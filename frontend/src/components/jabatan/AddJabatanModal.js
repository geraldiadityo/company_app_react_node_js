import React, {Fragment, useState} from "react";
import { Button,Modal,ModalBody,ModalHeader } from "react-bootstrap";
import AddJabatan from "./AddJabatan";

const AddJabatanModal = (props) => {
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(state => !state);
    };

    const create = props.create;
    let title = "Edit Jabatan";
    let button = <Button onClick={toggle}>Edit</Button>;
    if (create){
        title = "Add Jabatan";
        button = (
            <Button color="primary" className="float-right" onClick={toggle} style={{minWidth:'20px'}}>Add New</Button>
        );
    }

    return (
        <Fragment>
            {button}
            <Modal show={modal} onHide={toggle}>
                <ModalHeader closeButton>{title}</ModalHeader>
                <ModalBody>
                    <AddJabatan resetState={props.resetState} toggle={toggle}
                    jabatan={props.jabatan}
                    toggleNotif={props.toggleNotif}
                    setMessageNotif={props.setMessageNotif}/>
                </ModalBody>
            </Modal>
        </Fragment>
    );
};

export default AddJabatanModal;
