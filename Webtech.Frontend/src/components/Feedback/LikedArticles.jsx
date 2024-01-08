import React, {useEffect, useState} from 'react';
import ArticleService from "../../services/ArticleService";
import axios from "axios";
import '../../css/loader.css'
import FeedbackCard from "./FeedbackCard";
import {getToken} from "../../extensions/encryption";

const LikedArticles = () => {

    const token = getToken();

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setData(await ArticleService.getUserFeedbackLikeArticles());
        } catch (error) {
            console.error('ArticleAPI stopped');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData().then();
    }, []);

    return (
        <>
            <FeedbackCard isLoading={isLoading} data={data} />
        </>
    );
};

export default LikedArticles;
