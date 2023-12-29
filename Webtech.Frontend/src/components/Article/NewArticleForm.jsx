import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import ArticleService from "../../services/ArticleService";
import ArticleNotify from "../../notify/ArticleNotify";

const useToken = () => {
    const [cookies] = useCookies(['token']);
    return cookies.token;
};
const NewArticleForm = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        articleHeader: {
            title: "",
            header: "",
            imageUrl: "",
        },
        articleBody: {
            body: "",
            imageUrl1: "",
            imageUrl2: "",
            imageUrl3: ""
        }
    });

    const token = useToken();

    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        ArticleService.createArticle(formData).then(() => {
            ArticleNotify.addArticleSuccess()
            navigate("/");
        }).catch(() =>{
            ArticleNotify.addArticleError()
            navigate("/");
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            articleHeader: {
                ...prevFormData.articleHeader,
                [name]: value,
            },
            articleBody: {
                ...prevFormData.articleBody,
                [name]: value,
            },
        }));
    };

    return (
        <div className={"container"}>
            <div className={"row"}>
                <form onSubmit={handleSubmit}>
                    <div className={"offset-xl-3 col-xl-6"}>
                        <div className={"row mt-xl-4"} style={{backgroundColor: "white", borderRadius: "3px"}}>
                            <div className={"mt-xl-3 col-xl-12 text-xl-center"}>
                                <h4 style={{fontWeight: 'bold'}}>Adding an article</h4>
                            </div>
                            <div className={"col-xl-12 mt-2"}>
                                <p className={"mb-0"} style={{fontWeight: 'bold'}}>Title*</p>
                                <input className={"form-control"} type="text" id="title"
                                       name="title" value={formData.articleHeader.title} onChange={handleChange}/>
                            </div>
                            <div className={"col-xl-12 mt-2"}>
                                <p className={"mb-0"} style={{fontWeight: 'bold'}}>Header*</p>
                                <input className={"form-control"} type="text" id="articleHeader.header"
                                       name="header" value={formData.articleHeader.header}
                                       onChange={handleChange}/>
                            </div>
                            <div className={"col-xl-12 mt-2"}>
                                <p className={"mb-0"} style={{fontWeight: 'bold'}}>Title image*</p>
                                <input className={"form-control"} type="text" id="imageUrl"
                                       name="imageUrl" value={formData.articleHeader.imageUrl}
                                       onChange={handleChange}/>
                            </div>
                            <div className={"col-xl-12 mt-2"}>
                                <p className={"mb-0"} style={{fontWeight: 'bold'}}>Body*</p>
                                <textarea className={"form-control"} id="body" name="body"
                                          value={formData.articleBody.body} onChange={handleChange}/>
                            </div>
                            <div className={"col-xl-12 mt-2"}>
                                <p className={"mb-0"} style={{fontWeight: 'bold'}}>Body image*</p>
                                <input className={"form-control"} type="text" id="imageUrl1"
                                       name="imageUrl1" value={formData.articleBody.imageUrl1}
                                       onChange={handleChange}/>
                            </div>
                            <div className={"col-xl-12 mt-2"}>
                                <p className={"mb-0"} style={{fontWeight: 'bold'}}>Body image</p>
                                <input className={"form-control"} type="text" id="imageUrl2"
                                       name="imageUrl2" value={formData.articleBody.imageUrl2}
                                       onChange={handleChange}/>
                            </div>
                            <div className={"col-xl-12 mt-2"}>
                                <p className={"mb-0"} style={{fontWeight: 'bold'}}>Body image</p>
                                <input className={"form-control"} type="text" id="imageUrl3"
                                       name="imageUrl3" value={formData.articleBody.imageUrl3}
                                       onChange={handleChange}/>
                            </div>
                            <div className={"col-xl-12 mt-3 mb-4"}>
                                <button className={"w-100 btnLogin"} type="submit"><p
                                    className={"mt-xl-1 mb-xl-1"}>Submit</p></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewArticleForm;
