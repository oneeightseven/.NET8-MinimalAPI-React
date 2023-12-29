import React, {useEffect, useState} from 'react';
import ArticleService from "../../services/ArticleService";
import axios from "axios";
import FeedbackCard from "./FeedbackCard";
import {getToken} from "../../extensions/encryption";

const MyComponent = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState([]);

    const token = getToken();

    const fetchData = async () => {

        setIsLoading(true);

        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setData(await ArticleService.getUserFeedbackDislikeArticles());
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

export default MyComponent;
