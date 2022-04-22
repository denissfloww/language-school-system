import formModel from './formModel';
const {
    formField: { name, desc, students, id, teacher, language, cost },
} = formModel;

export const emptyInitialValues: { [p: string]: string | { label: string; value: number }[] | undefined | number } = {
    [name.name]: '',
    [desc.name]: '',
    [students.name]: [],
    [teacher.name]: undefined,
    [language.name]: undefined,
    [cost.name]: undefined,
    [id.name]: undefined,
};
