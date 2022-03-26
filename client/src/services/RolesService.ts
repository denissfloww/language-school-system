import { IRole } from '../interfaces/IRole';
import axios from 'axios';
import { API_URL } from '../urls';

const getRoles = async () => {
    const response = await axios.get(`${API_URL}/roles`);
    const roles: IRole[] = response.data;

    return roles;
};

const RolesService = { getRoles };
export default RolesService;
