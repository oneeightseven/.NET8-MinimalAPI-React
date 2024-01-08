import React from 'react';
import {Link} from "react-router-dom";
import Notifications from "../Notification/Notifications";
import {getRole} from "../../extensions/encryption";

const AccountHeader = () => {
    return (<>
        {getRole() !== undefined ? (
        <div style={{display:"none"}}><Notifications/></div>
            ): (
            <div></div>
        )}
            <div className="container-fluid" style={{boxShadow: '1px 10px 80px black'}}>
                <div className="row">
                    <div className="col-xl-12" style={{backgroundColor: '#2C4251', borderBottom: '1px solid black'}}>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-2 col-3 text-end mt-xl-3 mb-xl-2">
                                    <Link style={{textDecoration: 'none'}} to="/"><h1
                                        style={{color: 'white', fontWeight: 'bold'}}>WebTech</h1></Link>
                                </div>
                                <div className="col-xl-3 col-10 text-start mt-xl-4">
                                    <Link style={{textDecoration: 'none'}} to="/addingArticle"><h3
                                        style={{color: 'white'}}>Account</h3></Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>);
};

export default AccountHeader;
