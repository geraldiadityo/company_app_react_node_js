import { Alert } from "react-bootstrap";

const NotifEmployee = (props) => {
    return (
        <Alert variant={props.variant} show={props.notif}>
            <p>
                {props.message}
            </p>
        </Alert>
    );
};

export default NotifEmployee;