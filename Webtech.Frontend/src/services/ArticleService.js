import axios from 'axios';
import config from '../config.json';

class ArticleService {
    static getHeaders = async () => (await axios.get(config.gatewayUrl + "GetHeaders")).data
    static getUserFeedbackLikeArticles = async () => (await axios.get(config.gatewayUrl + "GetUserFeedbackLikeArticles")).data
    static getUserFeedbackDislikeArticles = async () => (await axios.get(config.gatewayUrl + "GetUserFeedbackDislikeArticles")).data
    static getUserFeedbackById = async () => (await axios.get(config.gatewayUrl + "GetUserFeedbackById")).data
    static getBody = async (bodyId) => (await axios.get(config.gatewayUrl + "GetBody/" + bodyId)).data
    static getUserFeedback = async (bodyId) => (await axios.get(config.gatewayUrl + "GetUserFeedbackArticle/" + bodyId)).data;
    static addLike = async (bodyId) => await axios.post(config.gatewayUrl + "AddLike/" + bodyId)
    static sendNotificationAuthor = async (userId) => await axios.post("http://localhost:5252/PostMessage?userId=" + userId)
    static removeLike = async (bodyId) => await axios.post(config.gatewayUrl + "RemoveLike/" + bodyId)
    static addDislike = async (bodyId) => await axios.post(config.gatewayUrl + "AddDislike/" + bodyId)
    static removeDislike = async (bodyId) => await axios.post(config.gatewayUrl + "RemoveDislike/" + bodyId)
    static incrementLikeArticle = async (bodyId) => await axios.post(config.gatewayUrl + "IncrementLikeArticle/" + bodyId)
    static decrementLikeArticle = async (bodyId) => await axios.post(config.gatewayUrl + "DecrementLikeArticle/" + bodyId)
    static incrementDislikeArticle = async (bodyId) => await axios.post(config.gatewayUrl + "IncrementDislikeArticle/" + bodyId)
    static decrementDislikeArticle = async (bodyId) => await axios.post(config.gatewayUrl + "DecrementDislikeArticle/" + bodyId)
    static incrementArticleView = async (bodyId) => await axios.post(config.gatewayUrl + "IncrementArticleView/" + bodyId)
    static createArticle = async (article) => await axios.post(config.gatewayUrl + "CreateArticle", article)
}

export default ArticleService;


