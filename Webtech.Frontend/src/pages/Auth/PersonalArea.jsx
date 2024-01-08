import React, {useEffect, useState} from 'react';
import LogoutButton from "../../components/Auth/LogoutButton";
import {useNavigate} from "react-router-dom";
import {getRole} from "../../extensions/encryption";
import AccountHeader from "../../components/Home/AccountHeader";
import {Button} from "react-bootstrap";
import MyArticles from "../../components/Feedback/MyArticles";
import LikedArticles from "../../components/Feedback/LikedArticles";
import DislikedArticles from "../../components/Feedback/DislikedArticles";
const PersonalArea = () => {

    const navigate = useNavigate();

    const [activeComponent, setComponentToShow] = useState('MyArticles');
    const [buttonColors, setButtonColors] = useState({
        MyArticles: 'primary',
        LikedArticles: 'primary',
        DislikedArticles: 'primary',
    });

    const handleButtonClick = (component) => {
        setComponentToShow(component);
        const updatedButtonColors = {
            ...buttonColors,
            [component]: 'success',
        };
        setButtonColors(updatedButtonColors);
    };


    useEffect(() => {
        getRole() === undefined && navigate("/login");
    }, [navigate]);


    return (
        <>
            <AccountHeader/>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-xl-11"}>
                        <div className={"row offset-xl-1 mt-3"} style={{backgroundColor: "white", borderRadius: "10px"}}>
                            <div className={"col-xl-12 mt-3"}>
                                <div className={"row"}>
                                    <div className={"col-xl-3 mt-xl-5"}>
                                        <div className={"offset-xl-1 mt-xl-5 px-4"}>
                                            <h5 className="mt-xl-5">
                                                <Button
                                                    onClick={() => handleButtonClick('MyArticles')}
                                                    variant={activeComponent === 'MyArticles' ? 'dark' : 'outline-dark'}
                                                    className="w-100"
                                                >
                                                    My articles
                                                </Button>
                                            </h5>
                                            <h5>
                                                <Button
                                                    onClick={() => handleButtonClick('LikedArticles')}
                                                    variant={activeComponent === 'LikedArticles' ? 'dark' : 'outline-dark'}
                                                    className="w-100"
                                                >
                                                    Liked articles
                                                </Button>
                                            </h5>
                                            <h5>
                                                <Button
                                                    onClick={() => handleButtonClick('DislikedArticles')}
                                                    variant={activeComponent === 'DislikedArticles' ? 'dark' : 'outline-dark'}
                                                    className="w-100"

                                                >
                                                    Disliked articles
                                                </Button>
                                            </h5>
                                            <h5><LogoutButton/></h5>

                                        </div>
                                    </div>
                                    <div className={"col-xl-9"}>
                                        {activeComponent === 'MyArticles' && <MyArticles/>}
                                        {activeComponent === 'LikedArticles' && <LikedArticles/>}
                                        {activeComponent === 'DislikedArticles' && <DislikedArticles/>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PersonalArea;
