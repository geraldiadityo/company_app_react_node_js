import React, {useState, useEffect} from "react";
import axios from "axios";
import authHeader from "../../service/auth-header";
import {set, useForm} from "react-hook-form";
import Select from "react-select";

const AddEmployee = (props) => {
    const [datajabatan, setDataJabatan] = useState([]);
    const [id, setId] = useState(0);
    const [eid, setEid] = useState("");
    const [ename, setEname] = useState("");
    const [gender, setGender] = useState("Male");
    const [jabatan, setJabatan] = useState("");

    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm();

    const API_URL = "http://localhost:8080/api/employee/";
    const API_URL_JABATAN = "http://localhost:8080/api/jabatan/";

    useEffect(() => {
        const preemployee = props.employee;
        getJabatans();
        if (preemployee){
            setId(preemployee.id);
            setEid(preemployee.eid);
            setEname(preemployee.ename);
            setGender(preemployee.gender);
            setJabatan(preemployee.jabatan.name);
        }
    },[]);

    const onChangeEid = (value) => {
        setEid(value);
    };

    const onChangeEname = (value) => {
        setEname(value);
    };

    const onChangeGender = (value) => {
        setGender(value);
    };

    const onChangeJabatan = (value) => {
        setJabatan(value);
    };

    const getJabatans = async() => {
        await axios.get(API_URL_JABATAN,{
            headers:authHeader()
        }).then((jabatan) => {
            const result = jabatan.data.map(data => {
                return {
                    label:data.name,
                    value:data.name
                }
            })
            setDataJabatan(result);
        });
    };
    
    const addEmployee = async() => {
        const data = {eid,ename,gender,jabatan};
        try{
            await axios.post(API_URL,data,{
                headers:authHeader()
            }).then((res) => {
                props.resetState();
                props.toggle();
                props.setMessageNotif(res.data.message,"success");
                props.toggleNotif();
            });
        }
        catch(err){
            console.log(err.message);
        }
    };

    const editEmployee = async() => {
        const data = {eid,ename,gender,jabatan};
        try{
            await axios.put(API_URL+`${id}/`,data,{
                headers:authHeader()
            }).then((res) => {
                props.resetState();
                props.toggle();
                props.setMessageNotif(res.data.message,"success");
                props.toggleNotif();
            });
        }
        catch(err){
            console.log(err.message);
        }
    };

    const defaultEmpty = (value) => {
        return value === "" ? "" : value;
    };

    let btn_name = "Add";
    if (props.employee){
        btn_name = "Update";
    }

    return (
        <form onSubmit={props.employee ? handleSubmit(editEmployee) : handleSubmit(addEmployee)} className="need-validations" noValidate>
            <div className="form-group">
                <label htmlFor="eid">Employee EID</label>
                <input type="text" className="form-control" {...register("eid",{
                    required:true
                })} value={defaultEmpty(eid)} onChange={(e) => onChangeEid(e.target.value)}/>
                {errors?.eid?.type==="required" && (
                    <div className="alert alert-danger" role="alert">
                        this field is required
                    </div>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="ename">Employee Name</label>
                <input type="text" className="form-control" {...register("ename",{
                    required:true
                })} value={defaultEmpty(ename)} onChange={(e) => onChangeEname(e.target.value)}/>
                {errors?.ename?.type==="required" && (
                    <div className="alert alert-danger" role="alert">
                        this field is required
                    </div>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="gender">gender</label>
                <select className="form-control" value={defaultEmpty(gender)} {...register("gender",{
                    required:true
                })} onChange={(e) => onChangeGender(e.target.value)}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                {errors?.gender?.type==="required" && (
                    <div className="alert alert-danger" role="alert">
                        this field is required
                    </div>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="jabatan">Jabatan</label>
                <Select options={datajabatan} {...register("jabatan",{
                    required:true
                })} onChange={(e) => setJabatan(e.value)}></Select>
                {errors?.jabatan?.type==="required" && (
                    <div className="alert alert-danger" role="alert">
                        this field is required
                    </div>
                )}
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary float-right">{btn_name}</button>
            </div>
        </form>
    );

};

export default AddEmployee;