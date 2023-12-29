import React, {useEffect} from 'react';
import LoginForm from "../../components/Auth/LoginForm";
import AccountHeader from "../../components/Home/AccountHeader";
import {useNavigate} from "react-router-dom";
import {getRole} from "../../extensions/encryption";

const Authorize = () => {

    const navigate = useNavigate();

    useEffect(() => {
        getRole() !== undefined && navigate("/personalArea");
    }, [navigate]);

    return (
        <>
         <AccountHeader/>
         <LoginForm/>
        </>
    );
};

export default Authorize;
