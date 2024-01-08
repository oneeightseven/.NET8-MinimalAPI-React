import React, {useEffect, useState} from 'react';
import {Button, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import Clock from '../../css/images/clock.svg'
import Eye from '../../css/images/eye.svg'
import Like from '../../css/images/like.svg'
import Dislike from '../../css/images/dislike.svg'
import ArticleService from "../../services/ArticleService";

const Card = () => {

    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            setData(await ArticleService.getHeaders());
        } catch (error) {
            console.error('ArticleAPI stopped');
        }
    };

    useEffect(()  => {
        fetchData().then();
    }, []);

    const handleButtonClick = async (bodyId) => await ArticleService.incrementArticleView(bodyId);

    return (
        <>
            {data.map(item => (
                <div key={item.id} className="container mt-2 pb-2" style={{backgroundColor: 'white'}}>
                    <div className="row">
                        <div className="col-xl-1 col-5 mt-2 text-xl-end">
                            <h4>Author</h4>
                        </div>
                        <div className="col-xl-2 col-7 text-end text-xl-start mt-2 mt-xl-3">
                            <h6 style={{color: "gray"}}>Tuesday, 14 November</h6>
                        </div>
                        <div className="offset-xl-7 col-xl-1 col-3 mt-xl-3 text-xl-end">
                            <h6 style={{color: "gray"}} >{item.views} <Image src={Eye} style={{width: '35%', marginTop: '-4px'}} alt = 'Eye'/></h6>
                        </div>
                        <div className="col-xl-1 col-3 mt-xl-3 text-xl-end text-start">
                            <h6 style={{color: "gray"}}>{item.readingTime}<Image src={Clock} style={{width: '35%', marginTop: '-4px'}} alt = 'Clock'/></h6>
                        </div>
                        <div className="col-xl-8 col-12">
                            <h1 style={{color: 'black'}}>{item.title}</h1>
                        </div>
                        <div className="col-xl-6 col-12">
                            <Image src={item.imageUrl} className="rounded" width="100%" alt="Image"/>
                        </div>
                        <div className="col-xl-6 col-12 mt-xl-0 mt-2">
                            <h4>{item.header}</h4>
                        </div>
                        <div className={"col-xl-1 mt-xl-3 col-3 text-xl-center"}>
                            <h6 style={{color: "gray"}} >{item.likes} <Image src={Like} style={{width: '35%'}} alt = 'Like'/></h6>
                        </div>
                        <div className={"col-xl-1 mt-xl-3 col-3 text-xl-start"}>
                            <h6 style={{color: "gray"}} >{item.dislikes} <Image src={Dislike} style={{width: '35%'}} alt = 'Dislike'/></h6>
                        </div>
                        <div className="offset-xl-8 col-xl-2 text-end">
                            <Link to={`/post/${item.articleBodyId}`}>
                                <Button variant={"light"} onClick={() => handleButtonClick(item.articleBodyId)}>More details</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Card;
