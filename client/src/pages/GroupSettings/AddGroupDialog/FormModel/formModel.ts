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
        students:{
            name: 'students',
            label: 'Ученики*',
            requiredErrorMsg: 'Необходимо выыбрать учеников!',
        }
    },
};
