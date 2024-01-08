import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Header from "../../components/Home/Header";
import ScreenshotSlider from "../../components/Article/ScreenshotSlider";
import {Image} from "react-bootstrap";
import Like from "../../css/images/like.svg";
import Dislike from "../../css/images/dislike.svg";
import ArticleService from "../../services/ArticleService";
import {getToken} from "../../extensions/encryption";
import AuthNotify from "../../notify/AuthNotify";
import NotificationService from "../../services/NotificationService";

const PostBody = () => {

    const navigate = useNavigate();
    const {postId} = useParams();
    const token = getToken();

    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0)
    const [article, setArticle] = useState({articleHeader: {}, articleBody: {}});
    const [feedback, setFeedback] = useState({Like: false, Dislike: false});
    const [bodyId, setBodyId] = useState(0);
    const [authorId, setAuthorId] = useState(0);
    const [notification, setNotification] = useState({
        date: "",
        userName: "",
        articleId: "",
        articleTitle: "",
        statusNotification: false
    });
    const imageUrls = [
        article.articleBody.imageUrl1,
        article.articleBody.imageUrl2,
        article.articleBody.imageUrl3
    ];

    const likeStyle = {
        color: isLiked ? 'red' : 'gray', fontWeight: isLiked ? 'bold' : 'normal'
    };
    const dislikeStyle = {
        color: isDisliked ? 'red' : 'gray', fontWeight: isDisliked ? 'bold' : 'normal'
    };

    const handleLikeClick = async () => {
        if (token !== undefined) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            if (isLiked) {
                setIsLiked(false);
                setLikeCount(likeCount - 1);
                await ArticleService.removeLike(bodyId);
                await ArticleService.decrementLikeArticle(bodyId);
            } else {
                setIsLiked(true);
                setLikeCount(likeCount + 1);
                await ArticleService.addLike(bodyId);
                await NotificationService.addNotification(authorId, notification);
                await ArticleService.incrementLikeArticle(bodyId);
                await ArticleService.sendNotificationAuthor(authorId);
                if (isDisliked) {
                    setIsDisliked(false);
                    setDislikeCount(dislikeCount - 1);
                    await ArticleService.removeDislike(bodyId);
                    await ArticleService.decrementDislikeArticle(bodyId);
                }
            }
        } else {
            AuthNotify.notAuthorized();
            navigate("/Login");
        }
    }
    const handleDislikeClick = async () => {
        if (token !== undefined) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            if (isDisliked) {
                setIsDisliked(false);
                setDislikeCount(dislikeCount - 1);
                await ArticleService.removeDislike(bodyId);
                await ArticleService.decrementDislikeArticle(bodyId);
            } else {
                setIsDisliked(true);
                setDislikeCount(dislikeCount + 1);
                await ArticleService.addDislike(bodyId);
                await ArticleService.incrementDislikeArticle(bodyId);
                if (isLiked) {
                    setIsLiked(false);
                    setLikeCount(likeCount - 1);
                    await ArticleService.removeLike(bodyId);
                    await ArticleService.decrementLikeArticle(bodyId);
                }
            }
        } else {
            AuthNotify.notAuthorized();
            navigate("/Login");
        }
    }

    const fetchBody = async () => {
        try {
            setArticle(await ArticleService.getBody(postId));
            setLikeCount(article.articleHeader.likes);
            setDislikeCount(article.articleHeader.dislikes);
            setBodyId(article.articleHeader.articleBodyId);
            setAuthorId(article.articleHeader.authorId);
            setNotification(prevState => ({
                ...prevState,
                articleTitle: article.articleHeader.title,
                articleId: article.articleHeader.id
            }));
        } catch (error) {
            console.error(error);
        }
    }
    const fetchFeedBack = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setFeedback(await ArticleService.getUserFeedback(postId, token));
            setIsLiked(feedback.like);
            setIsDisliked(feedback.dislike);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchBody().then();

        if (token !== undefined) {
            fetchFeedBack().then();
        }

    }, [article.articleHeader.likes, article.articleHeader.dislikes]);

    return (<>
            <Header/>
            <div key={article.articleHeader.id} className="container mt-xl-2 pb-2"
                 style={{borderWidth: '1px', borderColor: 'black', backgroundColor: "white", borderRadius: "10px"}}>
                <div className={"row"}>
                    <div className={"col-xl-1 mt-xl-3 col-3 text-xl-center"} onClick={handleLikeClick}>
                        <h6 style={likeStyle}>{likeCount} <Image src={Like} style={{width: '35%'}} alt='Like'/></h6>
                    </div>
                    <div className={"col-xl-1 mt-xl-3 col-3 text-xl-start"} onClick={handleDislikeClick}>
                        <h6 style={dislikeStyle}>{dislikeCount} <Image src={Dislike} style={{width: '35%'}}
                                                                       alt='Dislike'/></h6>
                    </div>
                </div>
                <h2 className={'text-center fw-bold'}>{article.articleHeader.title}</h2>
                <h3 className={'text-center fw-bold'}>{article.articleHeader.header}</h3>
                <h4>{article.articleBody.body}</h4>
                <ScreenshotSlider imageUrls={imageUrls}/>
            </div>
        </>);
};

export default PostBody;
