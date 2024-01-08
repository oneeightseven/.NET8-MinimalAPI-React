import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import AuthService from "../../services/AuthService";
import {Link} from "react-router-dom";
import AuthNotify from "../../notify/AuthNotify";
import '../../css/loader.css'

const LoginForm = () => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [loginRequest, loginRequestData] = useState({
        username: "", password: ""
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        loginRequestData((prevFormData) => ({
            ...prevFormData, [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            AuthService.login(loginRequest)
                .then(() => {
                    AuthNotify.loginSuccess();
                    navigate("/");
                })
                .catch(() => {
                    AuthNotify.loginError();
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }, 500);
    };

    return (<>
            <div className={"container"}>
                {isLoading ? (<span className="loader"></span>) : (<div className={"row"}>
                        <form onSubmit={handleSubmit}>
                            <div className={"offset-xl-4 mt-xl-5 col-xl-4"}>
                                <div className={"row"} style={{backgroundColor: "white", borderRadius: "3px"}}>
                                    <div className={"offset-xl-1 mt-xl-5 col-xl-10"}>
                                        <h4 style={{fontWeight: 'bold'}}>Login</h4>
                                    </div>
                                    <div className={"offset-xl-1 col-xl-10 mt-5"}>
                                        <p className={"mb-0"} style={{fontWeight: 'bold'}}>E-mail</p>
                                        <input className={"form-control"} type="text" id="username" name="username"
                                               value={loginRequest.username} onChange={handleChange}/>
                                    </div>

                                    <div className={"offset-xl-1 col-xl-10 mt-4"}>
                                        <p className={"mb-0"} style={{fontWeight: 'bold'}}>Password</p>
                                        <input className={"form-control"} type="password" id="password"
                                               name="password"
                                               value={loginRequest.password} onChange={handleChange}/>
                                    </div>

                                    <div className={"offset-xl-1 col-xl-10 mt-4"}>
                                        <button className={"w-100 btnLogin"} type="submit"><p
                                            className={"mt-xl-1 mb-xl-1"}>Submit</p></button>

                                    </div>
                                    <div className={"offset-xl-1 col-xl-10 mt-2 mb-5"}>
                                        <Link style={{textDecoration: 'none'}} to="/login">
                                            <p className={"mb-0"}
                                               style={{fontSize: '15px', color: '#2C4251'}}>Forgot
                                                password?</p>
                                        </Link>
                                    </div>
                                </div>
                                <div className={"row mt-4"} style={{backgroundColor: "white", borderRadius: "3px"}}>
                                    <div className={"offset-xl-1 text-xl-center mt-xl-2 col-xl-10"}>
                                        <Link style={{textDecoration: 'none'}} to="/registration">
                                            <p style={{fontSize: '15px', color: '#2C4251'}}
                                               className={'mb-xl-1'}>Don't
                                                have an account yet? Register</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>)}
            </div>
        </>);
};

export default LoginForm;
