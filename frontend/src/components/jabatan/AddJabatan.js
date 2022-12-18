import React, {useState, useEffect} from "react";
import axios from "axios";
import authHeader from "../../service/auth-header";
import {useForm} from "react-hook-form";
const AddJabatan = (props) => {
    const [jabatan, setJabatan] = useState({
        id:0,
        name:'',
        salary:''
    });

    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm();

    const API_URL = "http://localhost:8080/api/jabatan/"

    useEffect(() => {
        const prejabatan = props.jabatan;
        if (prejabatan){
            const {id,name, salary} = prejabatan;
            setJabatan({id,name, salary});
        }
    },[]);

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setJabatan(prevstate => {
            const newState = {...prevstate};
            newState[name] = value;
            return newState;
        });
    };

    const addJabatan = async() => {
        try{
            await axios.post(API_URL,jabatan,{
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

    const editJabatan = async() => {
        try{
            await axios.put(API_URL+`${jabatan.id}/`,jabatan,{
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
    if (props.jabatan){
        btn_name = "Update";
    }

    return (
        <form onSubmit={props.jabatan ? handleSubmit(editJabatan) : handleSubmit(addJabatan)} className="need-validations" noValidate>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" {...register("name", {
                    required:true,
                    minLength:3,
                    maxLength:40
                })} value={defaultEmpty(jabatan.name)} onChange={onChange}/>
                {errors?.name?.type==="required" && (
                    <div className="alert alert-danger" role="alert">
                        this field is required!
                    </div>
                )}
                {errors?.name?.type==="minLength" && (
                    <div className="alert alert-danger" role="alert">
                        this field exceed min 3 character
                    </div>
                )}
                {errors?.name?.type==="maxLength" && (
                    <div className="alert alert-danger" role="alert">
                        this field cannot exceed 40 character
                    </div>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="salary">Salary</label>
                <input type="number" className="form-control" {...register("salary",{
                    valueAsNumber:true,
                    required:true
                })} value={defaultEmpty(jabatan.salary)} onChange={onChange}/>
                {errors?.salary?.type==="required" && (
                    <div className="alert alert-danger" role="alert">
                        this field is required
                    </div>
                )}
                {errors?.salary?.type==="valueAsNumber" && (
                    <div className="alert alert-danger" role="alert">
                        this value is not number
                    </div>
                )}
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary float-right">{btn_name}</button>
            </div>
        </form>
    );
};

export default AddJabatan;