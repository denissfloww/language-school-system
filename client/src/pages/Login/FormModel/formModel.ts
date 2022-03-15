export default {
    formId: 'login',
    formField: {
        login: {
            name: 'login',
            label: 'Логин',
            requiredErrorMsg: 'Поле обязательно для заполнения!',
        },
        password: {
            name: 'password',
            label: 'Пароль',
            requiredErrorMsg: 'Поле обязательно для заполнения!',
        },
        isRemember:{
            name: 'isRemember',
            label: 'Запомнить меня',
        }
    },
};
