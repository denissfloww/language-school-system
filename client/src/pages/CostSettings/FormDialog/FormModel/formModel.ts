export default {
    formId: 'costForm',
    formField: {
        name: {
            name: 'name',
            label: 'Название*',
            requiredErrorMsg: 'Название обязательно для заполнения!',
        },
        description: {
            name: 'description',
            label: 'Описание',
        },
        lessonPrice: {
            name: 'lessonPrice',
            label: 'Стоимость одного занятия*',
            requiredErrorMsg: 'Цена обязательна для заполнения!',
        },
        id: {
            name: 'id',
        },
    },
};
