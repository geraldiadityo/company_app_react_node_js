import React, {useState, useEffect} from "react";
import { Col,Row,Container } from "react-bootstrap";
import EmployeeList from "./EmployeeList";
import AddEmployeeModal from "./AddEmployeeModal";
import NotifEmployee from "./NotifEmployee";
import axios from "axios";
import authHeader from "../../service/auth-header";

const MainEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [notif, setNotif] = useState(false);
    const [message, setMessage] = useState("");
    const [variant, setVariant] = useState("");

    const API_URL = "http://localhost:8080/api/employee/";
    
    const getEmployee = async() => {
        try{
            await axios.get(API_URL,{
                headers:authHeader()
            }).then((res) => setEmployees(res.data.data));
        }
        catch(err){
            console.log(err.message);
        }
    };

    const resetState = () => {
        getEmployee();
    };

    useEffect(() => {
        resetState();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const toggleNotif = () => {
        setNotif(state => !state);
        setTimeout(() => {
            setNotif(state => !state);
        },3000);
    };

    const setMessageNotif = (message, variant) => {
        setMessage(message);
        setVariant(variant);
    };

    return (
        <div className="MainJabatan">
            <div className="display-3 text-white bg-secondary text-center">
                <h3>Geraldi LTD - Employee</h3>
            </div>
            <Container>
                <Row>
                    <Col>
                        <NotifEmployee notif={notif} message={message} variant={variant}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <EmployeeList employees={employees}
                        resetState={resetState}
                        toggleNotif={toggleNotif}
                        setMessageNotif={setMessageNotif}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AddEmployeeModal create={true}
                        resetState={resetState}
                        toggleNotif={toggleNotif}
                        setMessageNotif={setMessageNotif}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MainEmployee;