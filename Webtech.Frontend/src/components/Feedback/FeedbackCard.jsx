import React from 'react';
import {Button, Image} from "react-bootstrap";
import Eye from "../../css/images/eye.svg";
import Clock from "../../css/images/clock.svg";
import Like from "../../css/images/like.svg";
import Dislike from "../../css/images/dislike.svg";
import {Link} from "react-router-dom";

const FeedbackCard = ({isLoading, data}) => {
    return (
        <>
            <h1 className={"text-xl-end mb-5"}>My articles</h1>
            {isLoading ? (
                <span style={{top: '30%', left: '56%'}} className="loader"></span>
            ) : (
                data?.map(item => (
                    <div key={item?.id} className="container pb-lg-5" style={{backgroundColor: 'white'}}>
                        <div className="row">
                            <div className="col-xl-2 text-end">
                                <h4>Author</h4>
                            </div>
                            <div className="col-xl-3 text-start mt-xl-2">
                                <h6 style={{color: "gray"}}>Tuesday, 14 November</h6>
                            </div>
                            <div className="offset-xl-4 col-xl-2 mt-xl-2 text-xl-end">
                                <h6 style={{color: "gray"}}>{item?.views} <Image src={Eye}
                                                                                 style={{
                                                                                     width: '20%',
                                                                                     marginTop: '-2px'
                                                                                 }}
                                                                                 alt='Eye'/></h6>
                            </div>
                            <div className="col-xl-1 text-xl-end mt-xl-2">
                                <h6 style={{color: "gray"}}>{item?.readingTime}<Image src={Clock} style={{
                                    width: '45%', marginTop: '-2px'
                                }} alt='Clock'/></h6>
                            </div>
                            <div className="px-5 col-xl-11">
                                <h4 style={{color: 'black'}}>{item?.title}</h4>
                            </div>
                            <div className="px-5 col-xl-4">
                                <Image src={item?.imageUrl} className="rounded" width="130%" alt="Image"/>
                            </div>
                            <div className="col-xl-8">
                                <h6>{item?.header}</h6>
                            </div>
                            <div className={"px-5 mt-2 col-xl-4"}>
                                <div className="d-flex align-items-center">
                                    <h5 style={{color: "gray"}}>{item?.likes} <Image src={Like} style={{
                                        width: '35%',
                                        marginTop: '-8px'
                                    }} alt='Like'/></h5>
                                    <h5 style={{color: "gray"}}>{item?.dislikes} <Image src={Dislike}
                                                                                        style={{width: '35%'}}
                                                                                        alt='Dislike'/></h5>
                                </div>
                            </div>
                            <div className="offset-xl-8 col-xl-4 text-end">
                                <Link to={`/post/${item?.articleBodyId}`}>
                                    <Button variant={"light"}>More
                                        details</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </>
    );
};

export default FeedbackCard;
