import React, {useEffect, useState} from 'react';
import axios from "axios";
import ArticleService from "../../services/ArticleService";
import FeedbackCard from "./FeedbackCard";
import {getToken} from "../../extensions/encryption";

const MyArticles = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState([]);

    const token = getToken();

    const fetchData = async () => {

        setIsLoading(true);

        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setData(await ArticleService.getUserFeedbackById());
        } catch (error) {
            console.error('ArticleAPI stopped');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData().then();
    },[]);

    return (
        <>
            <FeedbackCard isLoading={isLoading} data={data} />
        </>
    );
};

export default MyArticles;
