import axios from "axios";
import Cookies from "js-cookie";
import {encryptedRole} from "../extensions/encryption";
import config from '../config.json';

class AuthService {
    static async login(loginRequest) {
         await axios.post(config.gatewayUrl + "Login", loginRequest) //Это URL моего API
            .then((response) => {
                Cookies.set("token", response.data.token, {expires: 1});
                Cookies.set("role", encryptedRole(response.data.user.role), {expires: 1});
            })
    };

    static async registration(registrationRequest){
       await axios.post(config.gatewayUrl + "Registration", registrationRequest);
    }
}

export default AuthService;