import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import AuthNotify from "../../notify/AuthNotify";

const LogoutButton = () => {

    const navigate = useNavigate();

    const handleClearCookies = () => {
        document.cookie = 'role=; Max-Age=-1; path=/;';
        document.cookie = 'token=; Max-Age=-1; path=/;';
        localStorage.setItem('countNotification', 0);
        AuthNotify.logoutSuccess();
        navigate("/")
    };

    return (
        <>
            <Button className="w-100" variant={"outline-dark"} onClick={handleClearCookies}>LogOut</Button>
        </>
    );
};

export default LogoutButton;