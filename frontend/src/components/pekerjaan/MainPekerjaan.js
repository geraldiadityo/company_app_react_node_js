import React,{useState,useEffect} from "react";
import { Col,Row,Container } from "react-bootstrap";
import PekerjaanList from "./PekerjaanList";
import AddPekerjaanModal from "./AddPekerjaanModal";
import NotifPekerjaan from "./NotifPekerjaan";
import authHeader from "../../service/auth-header";
import axios from "axios";

const MainPekerjaan = () => {
    const [pekerjaans, setPekerjaans] = useState([]);
    const [notif, setNotif] = useState(false);
    const [message, setMessage] = useState("");
    const [variant, setVariant] = useState("");

    const API_URL = "http://localhost:8080/api/pekerjaan/";

    const getPekerjaans = async() => {
        try{
            await axios.get(API_URL,{
                headers:authHeader()
            }).then((res) => setPekerjaans(res.data.data));
        }
        catch(err){
            console.log(err.message);
        }
    };

    const resetState = () => {
        getPekerjaans();
    };

    useEffect(() => {
        resetState();
    },[]);

    const toggleNotif = () => {
        setNotif(state => !state);
        setTimeout(() => {
            setNotif(state => !state);
        },2000);
    };

    const setMessageNotif = (message, variant) => {
        setMessage(message);
        setVariant(variant);
    };

    return (
        <div className="MainPekerjaan">
            <div className="text-center">
                <h3 className="display-3 text-white bg-secondary">
                    Geraldi LTD - Pekerjaan
                </h3>
            </div>
            <Container>
                <Row>
                    <Col>
                        <NotifPekerjaan notif={notif} message={message} variant={variant}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <PekerjaanList pekerjaans={pekerjaans} resetState={resetState}
                        setMessageNotif={setMessageNotif}
                        toggleNotif={toggleNotif}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AddPekerjaanModal resetState={resetState}
                        toggleNotif={toggleNotif}
                        setMessageNotif={setMessageNotif}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
   );
};

export default MainPekerjaan;