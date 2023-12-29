import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../../services/AuthService";
import AuthNotify from "../../notify/AuthNotify";

const RegistrationForm = () => {

    const navigate = useNavigate();

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => setIsChecked(!isChecked);

    const [registrationRequest, registrationRequestData] = useState({
        email: "",
        name: "",
        phonenumber: "",
        password: ""
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        registrationRequestData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        AuthService.registration(registrationRequest).then(() => {
            AuthNotify.registrationSuccess();
            navigate("/login");
        }).catch(() => {
            AuthNotify.registrationError();
        });
    };

    return (
        <>
            <div className={"container"}>
                <div className={"row"}>
                    <form onSubmit={handleSubmit}>
                        <div className={"offset-xl-4 mt-xl-5 col-xl-4"}>
                            <div className={"row"} style={{backgroundColor: "white", borderRadius: "3px"}}>
                                <div className={"offset-xl-1 mt-xl-5 col-xl-10"}>
                                    <h4 style={{fontWeight: 'bold'}}>Registration</h4>
                                </div>
                                <div className={"offset-xl-1 col-xl-10 mt-5"}>
                                    <p className={"mb-0"} style={{fontWeight: 'bold'}}>E-mail</p>
                                    <input className={"form-control"} type="text" id="email" name="email"
                                           value={registrationRequest.email} onChange={handleChange}/>
                                </div>

                                <div className={"offset-xl-1 col-xl-10 mt-4"}>
                                    <p className={"mb-0"} style={{fontWeight: 'bold'}}>Name</p>
                                    <input className={"form-control"} type="text" id="name" name="name"
                                           value={registrationRequest.name} onChange={handleChange}/>
                                </div>

                                <div className={"offset-xl-1 col-xl-10 mt-4"}>
                                    <p className={"mb-0"} style={{fontWeight: 'bold'}}>Phone number</p>
                                    <input className={"form-control"} type="text" id="phonenumber" name="phonenumber"
                                           value={registrationRequest.phonenumber} onChange={handleChange}/>
                                </div>

                                <div className={"offset-xl-1 col-xl-10 mt-4"}>
                                    <p className={"mb-0"} style={{fontWeight: 'bold'}}>Password</p>
                                    <input className={"form-control"} type="password" id="password" name="password"
                                           value={registrationRequest.password} onChange={handleChange}/>
                                </div>

                                <div className={"offset-xl-1 col-xl-10 mt-4"}>
                                    <label>
                                        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
                                        <span style={{fontSize: '15px'}}> I accept the terms of the User Agreement</span>
                                    </label>
                                </div>


                                <div className={"offset-xl-1 col-xl-10 mt-2 mb-5"}>
                                    <button disabled={!isChecked} className={"w-100 btnLogin"} type="submit"><p
                                        className={"mt-xl-1 mb-xl-1"}>Submit</p></button>
                                </div>

                            </div>
                            <div className={"row mt-4"} style={{backgroundColor: "white", borderRadius: "3px"}}>
                                <div className={"offset-xl-1 text-xl-center mt-xl-2 col-xl-10"}>
                                    <Link style={{textDecoration: 'none'}} to="/login">
                                        <p style={{fontSize: '15px', color: '#2C4251'}} className={'mb-xl-1'}>Already registered? Sign in</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegistrationForm;
