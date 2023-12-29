import { AES } from 'crypto-js';
import Cookies from 'js-cookie';
import config from '../config.json';

export const encryptedRole = (role) => {
    return AES.encrypt(role, config.roleSecretKey).toString();
}

export const getRole = () => {
    try{
        const decryptedRole = AES.decrypt(Cookies.get('role'), config.roleSecretKey).toString();
        return hexToString(decryptedRole);
    }
    catch (ex){
        return undefined
    }
}
export const getToken = () => Cookies.get('token')

const hexToString = (hex) => {
    const charCodes = hex.match(/.{1,2}/g).map((pair) => parseInt(pair, 16));
    return String.fromCharCode(...charCodes);
};



