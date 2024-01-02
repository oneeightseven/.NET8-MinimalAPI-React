import React, {useEffect, useState} from 'react';
import {HubConnectionBuilder} from '@microsoft/signalr';
import {useCookies} from "react-cookie";
import FeedbackNotify from "../../notify/FeedbackNotify";
import * as signalR from '@microsoft/signalr';
import globalState from "../../extensions/globalState";
import axios from "axios";
import NotificationService from "../../services/NotificationService";


const useToken = () => {
    const [cookies] = useCookies(['token']);
    return cookies.token;
};



const Notifications = () => {

    const [noti, setNoti] = useState(localStorage.getItem('countNotification'));

    const token = useToken();

    const fetchData = async () => {

        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('countNotification', await NotificationService.getCountNotifications());
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {


        if (!globalState.isConnected) {
            const connection = new HubConnectionBuilder()
                .withUrl('http://localhost:5252/notifications', {
                    accessTokenFactory: () => token,
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets,
                })
                .build();
            connection.start()
                .then(() => {
                    connection.invoke('GetString')
                        .then(result => {
                            console.log('Connection to SignalR established');
                            globalState.isConnected = true;
                        })
                        .catch(error => {
                            console.error('Error connecting to SignalR:', error);
                        });
                })
                .catch(console.log);
            connection.on('ReceiveNotification', (message) => {
                FeedbackNotify.newAlert();
                const noti = parseInt(localStorage.getItem('countNotification'));
                localStorage.setItem('countNotification', noti + 1);
                setNoti(prevValue => prevValue + 1);
            });

            fetchData().then();
        }
    }, [noti]);

    return (
        <>
            {localStorage.getItem('countNotification')}
        </>
    );
};

export default Notifications;
