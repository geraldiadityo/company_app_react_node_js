import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthService from "../../service/auth.service";

const Login = () => {
    let navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        setMessage("");
        setLoading(true);

        AuthService.login(username, password).then(() => {
            navigate("/home");
            window.location.reload();
        },
        (error) => {
            const resMessage = (error.response &&
                error.response.data &&
                error.response.data.message) || error.message || error.toString();
            
            setLoading(false);
            setMessage(resMessage);
        });
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card"/>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" {...register("username",{
                            required:true,
                            minLength:3,
                            maxLength:20
                        })} value={username} onChange={onChangeUsername}/>
                        {errors?.username?.type==="required" && (
                            <div className="alert alert-danger" role="alert">
                                this field is required
                            </div>
                        )}
                        {errors?.username?.type==="minLength" && (
                            <div className="alert alert-danger" role="alert">
                                this field min exceed 3 character
                            </div>
                        )}
                        {errors?.username?.type==="maxLength" && (
                            <div className="alert alert-danger" role="alert">
                                this field cannot exceed 20 character
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" {...register("password",{
                            required:true,
                            minLength:6,
                            maxLength:30
                        })} value={password} onChange={onChangePassword}/>
                        {errors?.password?.type==="required" && (
                            <div className="alert alert-danger" role="alert">
                                this field is required
                            </div>
                        )}
                        {errors?.password?.type==="minLength" && (
                            <div className="alert alert-danger" role="alert">
                                this field exceed min 3 character
                            </div>
                        )}
                        {errors?.password?.type==="maxLength" && (
                            <div className="alert alert-danger" role="alert">
                                this field cannot exceed 30 character
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
                            {loading && (
                                <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">...Loading</span>
                                </div>
                            )}
                            <span> Login</span>
                        </button>
                    </div>
                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;