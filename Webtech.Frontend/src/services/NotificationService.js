import axios from "axios";
import config from "../config.json";

class NotificationService{
    static getNotifications = async () => (await axios.get(config.gatewayUrl + "GetNotifications")).data
    static getCountNotifications = async () => (await axios.get(config.gatewayUrl + "GetCountNotifications")).data
    static markNotificationsAsRead = async () => (await axios.post(config.gatewayUrl + "MarkNotificationsAsRead"))
    static addNotification = async (authorId, notification) => (await axios.post(config.gatewayUrl + `AddNotification/${authorId}`, notification))
}
export default NotificationService;
