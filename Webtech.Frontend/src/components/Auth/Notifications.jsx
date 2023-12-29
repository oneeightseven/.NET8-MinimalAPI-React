import React, {useEffect} from 'react';
import {HubConnectionBuilder} from '@microsoft/signalr';
import {useCookies} from "react-cookie";
import FeedbackNotify from "../../notify/FeedbackNotify";
import * as signalR from '@microsoft/signalr';
import globalState from "../../extensions/globalState";

const useToken = () => {
    const [cookies] = useCookies(['token']);
    return cookies.token;
};
const Notifications = () => {

    const token = useToken();

    useEffect(() => {

        if(!globalState.isConnected){
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
            });
        }
    }, []);

    return (
        <>
        </>
    );
};

export default Notifications;
