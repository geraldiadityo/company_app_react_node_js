import React, {useState, useEffect} from "react";
import authHeader from "../../service/auth-header";
import axios from "axios";
import Select from "react-select";
import UploadFile from "./service/FileUploadService";


const PekerjaanAdd = (props) => {
    const [nama, setNama] = useState("");
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [employee, setEmployee] = useState("");
    const [employess, setEmployees] = useState([]);

    const API_URL_EMPLOYEE = "http://localhost:8080/api/employee";

    const selectFile = (event) => {
        setCurrentFile(event.target.files[0]);
        setProgress(Math.round((100*event.loaded)/ event.total));
        setProgress(0);
    };

    const onChangeNama = (value) => {
        setNama(value);
    }

    const onChangeEmployee = (value) => {
        setEmployee(value);
    }

    const getDataEmployee = async() => {
        await axios.get(API_URL_EMPLOYEE,{
            headers:authHeader()
        }).then((res) => {
            const result = res.data.data.map(data => {
                return {
                    label:data.ename,
                    value:data.ename,
                }
            })
            setEmployees(result);
        });
    };


    useEffect(() => {
        getDataEmployee();
    },[]);

    const addPekerjaan = async(e) => {
        e.preventDefault();
        setProgress(0);
        await UploadFile(nama,currentFile,employee,(e) => {
            setProgress(Math.round((100*e.loaded)/ e.total));
        }).then((res) => {
            props.resetState();
            props.toggle();
            props.setMessageNotif(res.data.message, "success");
            props.toggleNotif();
        });
    };

    const defaultEmpty = (value) => {
        return value === "" ? "" : value;
    }

    return (
        <form onSubmit={addPekerjaan}>
            <div className="form-group">
                <label htmlFor="nama">Nama Pekerjaan</label>
                <input type="text" className="form-control" value={defaultEmpty(nama)} onChange={(e) => onChangeNama(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="filekerja">File Kerja</label>
                <input type="file" accept="*" className="form-control" onChange={selectFile}/>
                {currentFile && (
                    <div className="progress">
                        <div className="progress-bar" role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{width:progress+"%."}}>
                            {progress}%
                        </div>
                    </div>
                )}
            </div>
            <div className="form-group">
                <Select
                className="form-control"
                options={employess}
                onChange={(e) => onChangeEmployee(e.value)}
                />
            </div>
            <div className="form-group">
                <div></div>
                <button type="submit" className="btn btn-primary float-right">Upload</button>
            </div>
        </form>
    );
};

export default PekerjaanAdd;
