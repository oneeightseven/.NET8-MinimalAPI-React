import React from 'react';
import {Link} from "react-router-dom";
import {getRole} from "../../extensions/encryption";
import Notifications from "../Notification/Notifications";
import { ReactComponent as Noti } from '../../css/images/noti.svg'

const Header = () => {

    return (
        <>
            <div className="container-fluid" style={{boxShadow: '1px 70px 80px black'}}>
                <div className="row">
                    <div className="col-xl-12" style={{backgroundColor: '#2C4251', borderBottom: '1px solid black'}}>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-1 col-3 text-start mt-xl-2">
                                    <Link style={{textDecoration: 'none'}} to="/"><h3
                                        style={{color: 'white', fontWeight: 'bold'}}>WebTech</h3></Link>
                                </div>
                                <div className="col-xl-3 col-10 text-xl-center pe-5 mt-xl-3">
                                    <Link style={{textDecoration: 'none'}} to="/addingArticle"><h6
                                        style={{color: 'white'}}>How to become an author</h6></Link>
                                </div>
                                <div className="offset-xl-5 col-xl-3 col-10 text-xl-end mt-xl-3">
                                    <Link style={{textDecoration: 'none'}} to="/"><h6
                                        style={{color: 'lightgreen'}}>Weekly offer for backenders</h6></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-xl-12" style={{backgroundColor: '#2C4251', borderBottom: '1px solid black'}}>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-1 col-10 text-xl-start px-3 mt-xl-3 mb-xl-2">
                                    <Link style={{textDecoration: 'none'}} to="/"><h6 style={{color: 'white'}}>All
                                        posts</h6></Link>
                                </div>
                                <div className="col-xl-1 col-10 text-xl-start px-1 mt-xl-3">
                                    <Link style={{textDecoration: 'none'}} to="/"><h6
                                        style={{color: 'white'}}>Development</h6></Link>
                                </div>
                                <div className="col-xl-1 col-10 text-xl-start px-4 mt-xl-3">
                                    <Link style={{textDecoration: 'none'}} to="/"><h6
                                        style={{color: 'white'}}>Administration</h6></Link>
                                </div>
                                <div className="col-xl-1 col-10 text-xl-start px-5 mt-xl-3">
                                    <Link style={{textDecoration: 'none'}} to="/"><h6
                                        style={{color: 'white'}}>Design</h6></Link>
                                </div>
                                <div className="col-xl-1 col-10 text-xl-start px-3 mt-xl-3">
                                    <Link style={{textDecoration: 'none'}} to="/"><h6
                                        style={{color: 'white'}}>Marketing</h6></Link>
                                </div>
                                <div className="offset-xl-3 col-xl-4 col-10 text-xl-end mt-xl-1" style={{color:"white"}}>
                                    <h6>
                                        {getRole() !== undefined ? (
                                            <>
                                                <Link style={{ textDecoration: 'none' }} to="/PersonalArea">
                                                    <h6 style={{ color: 'white' }}>Personal area</h6>
                                                </Link>
                                                <Link style={{ textDecoration: 'none', color: "white" }} to="/Notifications">
                                                <Notifications /><Noti width={22} height={22} fill='white' />
                                                </Link>
                                            </>
                                        ) : (
                                            <Link style={{ textDecoration: 'none' }} to="/Login">
                                                <h6 style={{ color: 'white' }}>Login</h6>
                                            </Link>
                                        )}
                                    </h6>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>

    );
};

export default Header;
