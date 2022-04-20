export default {
    formId: 'changePassword',
    formField: {
        oldPassword: {
            name: 'oldPassword',
            label: 'Старый пароль*',
            requiredErrorMsg: 'Обязательно для заполнения!',
            validationErrorMsg: 'Пароль может содержать только латинские буквы',
            lengthErrorMsg: 'Пароль должен содержать не менее 8 символов.',
        },
        newPassword: {
            name: 'newPassword',
            label: 'Новый пароль*',
            requiredErrorMsg: 'Обязательно для заполнения!',
            validationErrorMsg: 'Пароль может содержать только латинские буквы',
            lengthErrorMsg: 'Пароль должен содержать не менее 8 символов.',
        },
        confirmNewPassword: {
            name: 'confirmNewPassword',
            label: 'Подтвердите новый пароль*',
            requiredErrorMsg: 'Обязательно для заполнения!',
            validationErrorMsg: 'Пароль может содержать только латинские буквы',
            lengthErrorMsg: 'Пароль должен содержать не менее 8 символов.',
        },
    },
};
