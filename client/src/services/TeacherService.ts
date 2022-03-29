import {ITeacher} from "../interfaces/ITeacher";
import axios from "axios";
import {API_URL} from "../urls";
import {IPageDataResponse} from "./responses/types";

const getTeachers = async () => {
    const response = await axios.get(`${API_URL}/teachers`)

    const data: IPageDataResponse<ITeacher> = response.data;
    return data;
};

const TeachersService = {
    getTeachers,
};
export default TeachersService;