import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));
const API_URL = "http://localhost:8080/api/pekerjaan/"

const upload = (nama,file, onUploadProgress) => {
    let formData = new FormData();

    formData.append("nama",nama);
    formData.append("file",file);

    return axios.post(API_URL,formData,{
        headers:{
            "Content-Type":"multipart/form-data",
            "x-access-token":user.accessToken
        },
        onUploadProgress,
    });
};

export default upload;
