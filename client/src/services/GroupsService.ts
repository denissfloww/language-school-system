import { IGroupCreateUpdateValues } from '../redux/reducers/groups/types';
import { IGroup } from '../interfaces/IGroup';

const getGroups = () => {
    const groups: IGroup[] = [
        {
            id: 1,
            name: 'Англ',
            desc: 'Группа по англ языку',
        },
        {
            id: 2,
            name: 'Англ',
            desc: 'Группа по англ языку',
        },
        {
            id: 3,
            name: 'Англ',
            desc: 'Группа по англ языку',
        },
    ];

    return groups;
};

const createGroup = (values: any) => {
    const studentIds: number[] = values.students.map((student: any) => {
        return parseInt(student.value);
    });

    const createValues: IGroupCreateUpdateValues = {
        name: values.name,
        desc: values.desc,
        studentIds: studentIds,
        id: values.id,
    };
    console.log(createValues);
};

const getGroupById = (id: number) => {
    const testGroup: IGroup = {
        name: 'test',
        id: 1,
        desc: '',
        students: [
            {
                firstName: 'Бугаков Денис',
                id: 1,
            },
        ],
    };

    return testGroup;
};

const GroupsService = {
    getGroups,
    createGroup,
    getGroupById,
};
export default GroupsService;
