import axios from "axios";
import config from "../config.json";

class NotificationService{
    static getNotifications = async () => (await axios.get(config.gatewayUrl + "GetNotifications")).data
    static getCountNotifications = async () => (await axios.get(config.gatewayUrl + "GetCountNotifications")).data
}
export default NotificationService;
