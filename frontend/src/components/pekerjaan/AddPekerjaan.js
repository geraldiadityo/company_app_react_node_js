import React, {useState} from "react";
import UploadService from "./service/FileUploadService";


const PekerjaanAdd = (props) => {
    const [nama, setNama] = useState("");
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);

    const selectFile = (event) => {
        setCurrentFile(event.target.files[0]);
        setProgress(0);
    };

    const onChangeNama = (value) => {
        setNama(value);
    }

    const addPekerjaan = async() => {
        setProgress(0);
        UploadService.upload(nama,currentFile,(event) => {
            setProgress(Math.round((100*event.loaded)/ event.total));
        }).then((res) => {
            props.resetState();
            props.toggle();
            props.setMessageNotif(res.data.message,"success");
            props.toggleNotif();
        }).catch((err) => {
            setProgress(0);
            setCurrentFile(undefined);
            setNama("");
            props.toggle();
            props.setMessageNotif(err.message,"danger");
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
                <input type="text" name="nama" className="form-control" value={defaultEmpty(nama)} onChange={(e) => onChangeNama(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="filekerja">File Kerja</label>
                <input type="file" className="form-control" onChange={selectFile}/>
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
                <div></div>
                <button type="submit" className="btn btn-primary float-right">Upload</button>
            </div>
        </form>
    );
};

export default PekerjaanAdd;
