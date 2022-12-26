import React,{Fragment,useState} from "react";
import { Button, Modal, ModalHeader,ModalFooter } from "react-bootstrap";
import axios from "axios";
import authHeader from "../../service/auth-header";


const RemConfirmEmployee = (props) => {
    const [modal, setModal] = useState(false);
    
    const API_URL = "http://localhost:8080/api/employee/";

    const toggle = () => {
        setModal(state => !state);
    };

    const deleteEmployee = async(properties) => {
        try{
            await axios.delete(API_URL+`${properties.id}/`,{
                headers:authHeader()
            }).then((res) => {
                props.resetState();
                toggle();
                props.setMessageNotif(res.data.message,"success");
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
                    Do you really wanna delete this employee ?
                </ModalHeader>
                <ModalFooter>
                    <Button type="button" onClick={() => toggle()}>Cancel</Button>
                    <Button type="button" onClick={() => deleteEmployee(props)}>Yes</Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
};

export default RemConfirmEmployee;
