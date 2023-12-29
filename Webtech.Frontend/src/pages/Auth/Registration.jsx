import React, {useEffect} from 'react';
import RegistrationForm from "../../components/Auth/RegistrationForm";
import AccountHeader from "../../components/Home/AccountHeader";
import {useNavigate} from "react-router-dom";
import {getRole} from "../../extensions/encryption";

const Registration = () => {

    const navigate = useNavigate();

    useEffect(() => {
        getRole() !== undefined && navigate("/personalArea");
    }, [navigate]);


    return (
        <>
            <AccountHeader/>
            <RegistrationForm/>
        </>
    );
};

export default Registration;
