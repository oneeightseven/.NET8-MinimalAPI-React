import React, {useEffect, useState} from 'react';
import NotificationCard from "../../components/Notification/NotificationCard";
import {getToken} from "../../extensions/encryption";
import axios from "axios";
import ArticleService from "../../services/ArticleService";
import NotificationService from "../../services/NotificationService";
import Header from "../../components/Home/Header";


const NotificationHistory = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState([]);

    const token = getToken();

    const fetchData = async () => {

        setIsLoading(true);

        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setData(await NotificationService.getNotifications());
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
            <Header/>
           <NotificationCard isLoading={isLoading} data={data}></NotificationCard>
        </>
    );
};

export default NotificationHistory;
