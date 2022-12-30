import React, {Fragment, useState} from "react";
import { Button, Modal, ModalHeader, ModalFooter } from "react-bootstrap";
import axios from "axios";
import authHeader from "../../service/auth-header";

const RemConfirmPekerjaan = (props) => {
    
    const [modal, setModal] = useState(false);

    const API_URL = "http://localhost:8080/api/pekerjaan/";

    const toggle = () => {
        setModal(state => !state);
    };

    const deletePekerjaan = async(properties) => {
        try{
            await axios.delete(API_URL+`${properties.id}/`,{
                headers:authHeader()
            }).then((res) => {
                props.resetState();
                toggle();
                props.setMessageNotif(res.data.message, "success");
                props.toggleNotif();
            });
        }
        catch(err){
            console.log(err.message);
        }
    };

    return (
        <Fragment>
            <Button variant="danger" onClick={() => toggle()}>
                Delete
            </Button>
            <Modal show={modal} onHide={toggle}>
                <ModalHeader closeButton>
                    Do you really wanna deleting this file ?
                </ModalHeader>
                <ModalFooter>
                    <Button onClick={() => toggle()}>Cancel</Button>
                    <Button onClick={() => deletePekerjaan(props)}>Yes</Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
};

export default RemConfirmPekerjaan;
