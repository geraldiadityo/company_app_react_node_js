import React, {Fragment, useState} from "react";
import { Button, Modal, ModalBody,ModalHeader } from "react-bootstrap";
import AddEmployee from "./AddEmployee";

const AddEmployeeModal = (props) => {
    const [modal, setModal] = useState(false);
    
    const toggle = () => {
        setModal(state => !state);
    }

    const create = props.create;
    let title = "Edit Employee";
    let button = <Button onClick={toggle}>Edit</Button>;

    if (create){
        title = "Add Employee";
        button = (
            <Button color="primary" className="float-right" onClick={toggle} style={{minWidth:"20px"}}>Add</Button>
        );
    }

    return (
        <Fragment>
            {button}
            <Modal show={modal} onHide={toggle}>
                <ModalHeader closeButton>{title}</ModalHeader>
                <ModalBody>
                    <AddEmployee resetState={props.resetState}
                    employee={props.employee}
                    toggleNofit={props.toggleNotif}
                    setMessageNotif={props.setMessageNotif}/>
                </ModalBody>
            </Modal>
        </Fragment>
    );
};

export default AddEmployeeModal;
