import formModel from './formModel';
const {
    formField: { name, desc, students, id, teacher, language },
} = formModel;

export const emptyInitialValues: { [p: string]: string | { label: string; value: string }[] | undefined | number } = {
    [name.name]: '',
    [desc.name]: '',
    [students.name]: [],
    [teacher.name]: undefined,
    [language.name]: undefined,
    [id.name]: undefined,
};
