import React, {Fragment, useState} from "react";
import {Button, Modal, ModalHeader, ModalFooter} from "react-bootstrap";
import axios from "axios";
import authHeader from "../../service/auth-header";

const RemConfirmJabatan = (props) => {
    const [modal, setModal] = useState(false);
    const API_URL = "http://localhost:8080/api/jabatan/"

    const toggle = () => {
        setModal(state => !state);
    };

    const deleteJabatan = async(properties) => {
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
                Remove
            </Button>
            <Modal show={modal} onHide={toggle}>
                <ModalHeader closeButton>
                    Do you really wanna delete this jabatan ?
                </ModalHeader>
                <ModalFooter>
                    <Button type="button" onClick={() => toggle()}>Cancel</Button>
                    <Button type="button" onClick={() => deleteJabatan(props)}>Yes</Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
};

export default RemConfirmJabatan;
