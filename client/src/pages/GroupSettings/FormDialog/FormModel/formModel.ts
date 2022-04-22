export default {
    formId: 'addGroupForm',
    formField: {
        name: {
            name: 'name',
            label: 'Название*',
            requiredErrorMsg: 'Имя обязательно для заполнения!',
        },
        desc: {
            name: 'desc',
            label: 'Описание',
        },
        students: {
            name: 'students',
            label: 'Ученики',
            requiredErrorMsg: 'Необходимо выыбрать учеников!',
        },
        id: {
            name: 'id',
        },
        teacher: {
            name: 'teacher',
            label: 'Учитель',
            requiredErrorMsg: 'Необходимо выбрать учителя!',
        },
        language: {
            name: 'language',
            label: 'Язык',
            requiredErrorMsg: 'Необходимо выбрать язык!',
        },
        cost: {
            name: 'cost',
            label: 'Тариф',
            requiredErrorMsg: 'Необходимо выбрать тариф!',
        },
    },
};
