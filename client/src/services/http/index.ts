import axios from 'axios';
import { API_URL } from '../../urls';
import TokenService from '../TokenService';
import { toast } from "react-toastify";
import { getErrorMsg } from "../../utils/helperFunc";
import { toastConfig } from "../../utils/toastConfig";

const $api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
});

$api.interceptors.request.use(async config => {
    if (config.headers === undefined) {
        config.headers = {};
    }
    const token = TokenService.getAccessToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
});

$api.interceptors.response.use(
    config => {
        return config;
    },
    async error => {
        const originalRequest = error.config;

        if (error.response.status == 401) {
            try {
                const response = await axios.post<{ refresh_token: string; access_token: string }>(API_URL + '/auth/refresh-token', {
                    refresh_token: TokenService.getRefreshToken(),
                });

                TokenService.saveAccessToken(response.data.access_token);
                TokenService.saveRefreshToken(response.data.refresh_token);

                return $api.request(originalRequest);
            } catch (e) {
                toast.error(getErrorMsg(e as any), toastConfig);
            }
        }
    },
);

export default $api;
