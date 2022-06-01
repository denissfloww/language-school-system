export default {
    formId: 'studentReportForm',
    formField: {
        reportDate: {
            name: 'reportDate',
            label: 'Дата отчёта*',
            requiredErrorMsg: 'Дата отчёта обязательна для заполнения!',
            typeErrorMsg: 'Введите дату в правильном формате!',
            maxDateErrorMsg: 'Вы не можете родиться в будущем!',
        },
        group: {
            name: 'group',
            label: 'Группа*',
            requiredErrorMsg: 'Необходимо выбрать группу!',
        },
        description: {
            name: 'description',
            label: 'Описание*',
            requiredErrorMsg: 'Обязательно для заполнения!',
        },
        isTest: {
            name: 'isTest',
            label: 'Отметить данные за ежемесячный тест?',
        },
        test: {
            name: 'test',
            label: 'Тест*',
            requiredErrorMsg: 'Обязательно для заполнения!',
        },
        testScore: {
            name: 'testScore',
            label: 'Набранные баллы*',
            requiredErrorMsg: 'Обязательно для заполнения!',
        },
    },
};
