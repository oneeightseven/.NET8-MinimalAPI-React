import React, {useEffect} from 'react';
import NewArticleForm from "../../components/Article/NewArticleForm";
import Header from "../../components/Home/Header";
import {getRole} from "../../extensions/encryption";
import {useNavigate} from "react-router-dom";


const AddingArticle = () => {

    const navigate = useNavigate();

    useEffect(() => {
        getRole() === undefined && navigate("/login");
    }, [navigate]);

    return (
        <>
            <Header/>
            <NewArticleForm/>
        </>
    );

};

export default AddingArticle;
