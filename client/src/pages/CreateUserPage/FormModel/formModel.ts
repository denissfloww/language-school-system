export default {
    formId: 'createUserForm',
    formField: {
        firstName: {
            name: 'firstName',
            label: 'Имя*',
            requiredErrorMsg: 'Имя обязательно для заполнения',
        },
        middleName: {
            name: 'middleName',
            label: 'Отчество',
        },
        lastName: {
            name: 'lastName',
            label: 'Фамилия*',
            requiredErrorMsg: 'Фамилия обязательна для заполнения',
        },
        role: {
            name: 'roles',
            label: 'Роль*',
            requiredErrorMsg: 'Выберите роль',
        },
        age: {
            name: 'age',
            label: 'Возраст*',
            requiredErrorMsg: 'Введите возраст',
        },
        phone: {
            name: 'phone',
            label: 'Номер телефона*',
            requiredErrorMsg: 'Введите номер телефона',
            validateErrorMsg: 'Введите корректный формат телефона',
        },
        email: {
            name: 'email',
            label: 'Электронная почта',
            requiredErrorMsg: 'Введите электронную почту',
            validateErrorMsg: 'Введите корректный формат электронной почты',
        },
        parentPhone: {
            name: 'parentPhone',
            label: 'Номер телефона родителя*',
            requiredErrorMsg: 'Введите номер телефона',
            validateErrorMsg: 'Введите корректный формат телефона',
        },
        parentName: {
            name: 'parentName',
            label: 'Имя родителя*',
            requiredErrorMsg: 'Имя обязательно для заполнения',
        },
        parentMiddleName: {
            name: 'parentMiddleName',
            label: 'Отчество родителя*',
            requiredErrorMsg: 'Отчество обязательно для заполнения',
        },
        parentLastName: {
            name: 'parentLastName',
            label: 'Фамилия родителя*',
            requiredErrorMsg: 'Фамилия обязательна для заполнения',
        },
        parentEmail: {
            name: 'parentEmail',
            label: 'Электронная почта родителя*',
            requiredErrorMsg: 'Введите электронную почту',
            validateErrorMsg: 'Введите корректный формат электронной почты',
        },
    },
};
