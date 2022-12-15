import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = async(username, email, password) => {
    return await axios.post(API_URL+"signup",{
        username,
        email,
        password
    });
};

const login = async(username, password) => {
    return await axios.post(API_URL+"signin",{
        username,
        password
    }).then((response) => {
        if (response.data.accessToken){
            localStorage.setItem("user",JSON.stringify(response.data));
        }
        return response.data;
    });
};

const logOut = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logOut,
    getCurrentUser
};

export default AuthService;