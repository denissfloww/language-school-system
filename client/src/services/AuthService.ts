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
    const user = await getCurrentUserFromJwtToken(response.data.access_token);
    if (isRemember) {
        TokenService.saveAccessToken(token);
        TokenService.saveRefreshToken(response.data.refresh_token);
        await saveCurrentUserToLocalStorage(user);
    }
    return user;
};

const saveCurrentUserToLocalStorage = async (user: ICurrentUser) => {
    localStorage.setItem(localStorageUserKey, JSON.stringify(user));
};

const updateJwtToken = async () => {
    return await $api.post(API_URL + '/auth/jwt/update').then(res => {
        TokenService.saveAccessToken(res.data.access_token);
        return res.data.access_token as string;
    });
};

const getCurrentUserFromJwtToken = async (jwtToken: string) => {
    const decoded: any = jwt_decode(jwtToken);
    const user: ICurrentUser = {
        id: decoded.id,
        login: decoded.login,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        roles: decoded.roles,
    };

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
    updateJwtToken,
    getCurrentUserFromJwtToken,
    saveCurrentUserToLocalStorage,
};
export default AuthService;
