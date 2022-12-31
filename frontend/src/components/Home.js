import React from "react";
import AuthService from "../service/auth.service";


const Home = () => {
    const currentUser = AuthService.getCurrentUser();

    return (
        <div className="container">
            <p>wellcome </p> {currentUser.username}
            <p>
                <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
                authorities :
            </p>
            <ul>
                {currentUser && 
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
        </div>
    );
};

export default Home;