import React, {useState, useEffect} from "react";
import { Col,Container, Row } from "react-bootstrap";
import JabatanList from "./JabatanList";
import AddJabatanModal from "./AddJabatanModal";
import axios from "axios";
import NotifJabatan from "./NotifJabatan";
import authHeader from "../../service/auth-header";
const MainJabatan = () => {
    const [jabatans, setJabatans] = useState([]);
    const [notif, setNotif] = useState(false);
    const [message, setMessage] = useState("");
    const [variant, setVariant] = useState("");
    
    const API_URL = "http://localhost:8080/api/jabatan/";

    const getJabatans = async() => {
        try{
            await axios.get(API_URL,{
                headers:authHeader()
            }).then((res) => {
                setJabatans(res.data.data);
            });
        }
        catch(err){
            console.log(err);
        }
    };

    const resetState = async() => {
        await getJabatans();
    };

    useEffect(() => {
        resetState();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const toggleNotif = () => {
        setNotif(state => !state);
        setTimeout(() => {
            setNotif(state => !state);
        }, 2000);
    };

    const setMessageNotif = (message, variant) => {
        setMessage(message);
        setVariant(variant)
    };

    return (
        <div className="MainJabatan">
            <div className="text-center">
                <h3 className="display-3 text-white bg-secondary">
                    Geraldi LTD
                </h3>
            </div>
            <Container>
                <Row>
                    <Col>
                        <NotifJabatan notif={notif} message={message} variant={variant}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <JabatanList jabatans={jabatans}
                        resetState={resetState}
                        toggleNotif={toggleNotif}
                        setMessageNotif={setMessageNotif}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AddJabatanModal create={true}
                        resetState={resetState}
                        toggleNotif={toggleNotif}
                        setMessageNotif={setMessageNotif}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MainJabatan;
