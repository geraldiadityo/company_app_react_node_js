import React, {useState, useEffect} from "react";
import axios from "axios";
import authHeader from "../../service/auth-header";
import {useForm,Controller} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
const AddJabatan = (props) => {
    const [jabatanname, setJabatanName] = useState("");
    const [salary, setSalary] = useState(0);

    const API_URL = "http://localhost:8080/api/jabatan/";

    const validationSchema = Yup.object().shape({
        name:Yup.string().required('this field is required').min(3,'this field exceed min 3 character'),
        salary:Yup.number().required('this field is required'),
    });

    const onChangeJabatanName = (value) => {
        setJabatanName(value);
        setValue("name",value);
    }

    const onChangeSalary = (value) => {
        setSalary(value);
        setValue("salary",value);
    }

    const {handleSubmit, setValue, control, formState:{errors}} = useForm({
        resolver:yupResolver(validationSchema)
    });

    const addJabatan = async(data) => {
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

    const editJabatan = async(data) => {
        try{
            await axios.put(API_URL+`${props.jabatan.id}/`,data,{
                headers:authHeader()
            }).then((res) => {
                props.resetState();
                props.toggle();
                props.setMessageNotif(res.data.message, "success");
                props.toggleNotif();
            });
        }
        catch(err){
            console.log(err.message);
        }
    };

    useEffect(() => {
        if (props.jabatan){
            axios.get(API_URL+`${props.jabatan.id}/`,{
                headers:authHeader()
            }).then((res) => {
                const fields = ['name','salary'];
                fields.forEach(field => setValue(field,res.data.data[field]));
                setJabatanName(res.data.data.name);
                setSalary(res.data.data.salary);
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const defaultEmpty = (value) => {
        return value === "" ? "" : value;
    };

    let btn_name = "Add";
    if (props.jabatan){
        btn_name="Update";
    }

    return (
        <form onSubmit={props.jabatan ? handleSubmit(editJabatan) : handleSubmit(addJabatan)}>
            <div className="form-group">
                <label htmlFor="name">Jabatan Name</label>
                <Controller
                name="name"
                control={control}
                render={({field}) => {
                    return (
                        <input type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        onChange={(e) => onChangeJabatanName(e.target.value)}
                        value={defaultEmpty(jabatanname)}
                        />
                    );
                }}
                />
                <div className="invalid-feedback">{errors?.name?.message}</div>
            </div>
            <div className="form-group">
                <label htmlFor="salary">Salary</label>
                <Controller
                name="salary"
                control={control}
                render={({field}) => {
                    return (
                        <input type="number"
                        className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                        onChange={(e) => onChangeSalary(e.target.value)}
                        value={defaultEmpty(salary)}
                        />
                    );
                }}
                />
                <div className="invalid-feedback">{errors?.salary?.message}</div>
            </div>
            <div className="form-control">
                <div>
                    <button type="submit" className="btn btn-primary float-right">{btn_name}</button>
                </div>
            </div>
        </form>
    );
};
export default AddJabatan;