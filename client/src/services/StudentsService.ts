import { IStudent } from '../interfaces/IStudent';

const getStudents = () => {
    const students: IStudent[] = [
        {
            id: 1,
            firstName: 'Бугаков Денис',
        },
        {
            id: 2,
            firstName: 'Петр Петрович',
        },
        {
            id: 3,
            firstName: 'Иван Петрович',
        },
        {
            id: 4,
            firstName: 'Иван Иванов',
        },
        {
            id: 5,
            firstName: 'Петр Иванович',
        },
    ];

    return students;
};

const StudentsService = {
    getStudents,
};
export default StudentsService;
