import axios from 'axios';
import { API_URL } from '../constants/urls';
import jwt_decode from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';
import { LOCAL_STORAGE_NAME } from '../settings';
import { ICreditionals } from '../redux/reducers/auth/types';
import { ICurrentUser } from '../interfaces/ICurrentUser';
import TokenService from './TokenService';
import $api from './http';
import { toast } from 'react-toastify';
import { toastConfig } from '../utils/toastConfig';
import { getErrorMsg } from '../utils/helperFunc';

const localStorageUserKey = `${LOCAL_STORAGE_NAME}User`;

const login = async (creditionals: ICreditionals) => {
    const { login, password, isRemember } = creditionals;
    const response = await axios.post(API_URL + '/auth/login', { login, password });
    const token = response.data.access_token;
    const decoded: any = jwt_decode(token);
    const user: ICurrentUser = {
        id: decoded.id,
        login: decoded.login,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        roles: decoded.roles,
    };
    if (isRemember) {
        TokenService.saveAccessToken(token);
        TokenService.saveRefreshToken(response.data.refresh_token);
        localStorage.setItem(localStorageUserKey, JSON.stringify(user));
    }
    return user;
};

const getLocalStorageUserData = async () => {
    const user = localStorage.getItem(localStorageUserKey);
    if (user) {
        return JSON.parse(user);
    }

    return null;
};

const removeLocalStorageUserData = async () => {
    localStorage.removeItem(localStorageUserKey);
};

const isUserExist = async () => {
    const isUserExistResponse = await $api
        .post(`${API_URL}/auth/check`)
        .then(data => {
            return data;
        })
        .catch(e => {
            if (!e.response) {
                toast.error('Connection error', toastConfig);
            } else {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        });

    return isUserExistResponse?.data;
};

const AuthService = {
    login,
    isUserExist,
    getLocalStorageUserData,
    removeLocalStorageUserData,
};
export default AuthService;
