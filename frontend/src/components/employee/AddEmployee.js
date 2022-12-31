import React, {useState, useEffect} from "react";
import axios from "axios";
import authHeader from "../../service/auth-header";
import {useForm,Controller} from "react-hook-form";
import Select from "react-select";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from 'yup';

const AddEmployee = (props) => {

    const [datajabatan, setDataJabatan] = useState([]);
    const [eid, setEid] = useState("");
    const [ename, setEname] = useState("");
    const [gender, setGender] = useState("");
    const [jabatan, setJabatan] = useState("");

    const API_URL = "http://localhost:8080/api/employee/";
    const API_JABATAN_URL = "http://localhost:8080/api/jabatan/";

    const validationSchema = Yup.object().shape({
        eid:Yup.string().required('this eid is required').min(3,'this field exceed 3 character'),
        ename:Yup.string().required('this is required'),
        gender:Yup.string().required('this field is required'),
        jabatan:Yup.string().required('this field is required')
    });

    const onChangeEid = (value) => {
        setEid(value);
        setValue("eid",value);
    }

    const onChangeEname = (value) => {
        setEname(value);
        setValue("ename",value);
    }

    const onChangeGender = (value) => {
        setGender(value);
        setValue("gender",value);
    }

    const onChangeJabatan = (value) => {
        setJabatan(value);
        setValue("jabatan",value);
    }

    const {handleSubmit, setValue, control,formState:{errors}} = useForm({
        resolver:yupResolver(validationSchema),
    });

    const addEmployee = async(data) => {
        try{
            await axios.post(API_URL,data,{
                headers:authHeader()
            }).then((res) => {
                props.resetState();
                props.toggle();
                props.setMessageNotif(res.data.message,"success");
                props.toggleNotif();
            })
        }
        catch(err){
            console.log(err.message);
        }
    };

    const editEmployee = async(data) => {
        try{
            await axios.put(API_URL+`${props.employee.id}/`,data,{
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

    const getDataJabatan = async() => {
        await axios.get(API_JABATAN_URL,{
            headers:authHeader()
        }).then((res) => {
            const result = res.data.data.map(data => {
                return {
                    label:data.name,
                    value:data.name,
                }
            })
            setDataJabatan(result);
        });
    };

    useEffect(() => {
        getDataJabatan();
        if (props.employee){
            axios.get(API_URL+`${props.employee.id}/`,{
                headers:authHeader()
            }).then(res => {
                const fields = ['eid','ename','gender','jabatan'];
                fields.forEach(field => setValue(field, field === 'jabatan' ? res.data.data[field].name : res.data.data[field]));
                setEid(res.data.data.eid);
                setEname(res.data.data.ename);
                setGender(res.data.data.gender);
                setJabatan(res.data.data.jabatan.name);
            });

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const defaultEmpty = (value) => {
        return value === "" ? "" : value;
    };


    let btn_name = "Add";
    if (props.employee){
        btn_name = "Update";
    }

    return (
        <form onSubmit={props.employee ? handleSubmit(editEmployee) : handleSubmit(addEmployee)}>
            <div className="form-group">
                <label htmlFor="eid">Employee ID</label>
                <Controller
                name="eid"
                control={control}
                render={({field: {value, onChange}}) => {
                    return (
                        <input type="text"
                        className={`form-control ${errors.eid ? 'is-invalid' : ''}`}
                        value={defaultEmpty(eid)}
                        onChange={(e) => onChangeEid(e.target.value)}/>
                    );
                }}
                />
                <div className="invalid-feedback">{errors?.eid?.message}</div>
            </div>
            <div className="form-group">
                <label htmlFor="ename">Employee Name</label>
                <Controller
                name="ename"
                control={control}
                render={({field: {value, onChange}}) => {
                    return (
                        <input type="text"
                        className={`form-control ${errors.ename ? 'is-invalid' : ''}`}
                        value={defaultEmpty(ename)}
                        onChange={(e) => onChangeEname(e.target.value)}
                        />
                    );
                }}
                />
                <div className="invalid-feedback">{errors?.ename?.message}</div>
            </div>
            <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <Controller
                name="gender"
                control={control}
                render={({field: {value, onChange}}) => {
                    return (
                        <select className={`form-control ${errors.gender ? 'is-invalid' : ''}`} value={defaultEmpty(gender)}
                        onChange={(e) => onChangeGender(e.target.value)}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    );
                }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="jabatan">Jabatan</label>
                <Controller
                control={control}
                name="jabatan"
                render={({field: {value, onChange}}) => {
                    return (
                        <Select
                        options={datajabatan}
                        placeholder={"Pilih Jabatan"}
                        onChange={(e) => onChangeJabatan(e.value)}
                        value={datajabatan.filter((option) => option.label === defaultEmpty(jabatan))}
                        ></Select>
                    );
                }}
                />
                <div className="invalid-feedback">{errors?.jabatan?.message}</div>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary float-right">{btn_name}</button>
            </div>
        </form>
    );

};

export default AddEmployee;