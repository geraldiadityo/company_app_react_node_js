import { Alert } from "react-bootstrap";

const NotifJabatan = (props) => {
    return (
        <Alert variant={props.variant} show={props.notif}>
            <p>
                {props.message}
            </p>
        </Alert>
    );
};

export default NotifJabatan;
