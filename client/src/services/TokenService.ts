export const localStorageAccessTokenName = 'access_token';
export const localStorageRefreshTokenName = 'refresh_token';

const saveAccessToken = (token: string) => {
    localStorage.setItem(localStorageAccessTokenName, JSON.stringify(token));
};

const getAccessToken = () => {
    const token = localStorage.getItem(localStorageAccessTokenName);
    if (token) {
        return JSON.parse(token);
    }

    return null;
};

const saveRefreshToken = (token: string) => {
    localStorage.setItem(localStorageRefreshTokenName, JSON.stringify(token));
};

const getRefreshToken = () => {
    const token = localStorage.getItem(localStorageRefreshTokenName);
    if (token) {
        return JSON.parse(token);
    }

    return null;
};

const TokenService = { saveAccessToken, saveRefreshToken, getRefreshToken, getAccessToken };
export default TokenService;
