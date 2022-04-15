export default {
    formId: 'changePassword',
    formField: {
        oldPassword: {
            name: 'oldPassword',
            label: 'Старый пароль*',
            requiredErrorMsg: 'Обязательно для заполнения!',
            validationErrorMsg: 'Пароль может содержать только латинские буквы',
            lengthErrorMsg: 'Пароль может содержать только латинские буквы.',
        },
        newPassword: {
            name: 'newPassword',
            label: 'Новый пароль*',
            requiredErrorMsg: 'Обязательно для заполнения!',
            validationErrorMsg: 'Пароль может содержать только латинские буквы',
            lengthErrorMsg: 'Пароль может содержать только латинские буквы.',
        },
        confirmNewPassword: {
            name: 'confirmNewPassword',
            label: 'Подтвердите новый пароль*',
            requiredErrorMsg: 'Обязательно для заполнения!',
            validationErrorMsg: 'Пароль может содержать только латинские буквы',
            lengthErrorMsg: 'Пароль может содержать только латинские буквы.',
        },
    },
};
