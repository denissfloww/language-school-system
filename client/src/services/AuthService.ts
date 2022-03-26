import axios from 'axios';
import { API_URL } from '../urls';
import jwt_decode from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';
import { LOCAL_STORAGE_NAME } from '../settings';
import { ICreditionals } from '../redux/reducers/auth/types';
import { ICurrentUser } from '../interfaces/ICurrentUser';

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
        token: token,
        roles: decoded.roles,
    };
    if (isRemember) {
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

const AuthService = {
    login,
    getLocalStorageUserData,
    removeLocalStorageUserData,
};
export default AuthService;
