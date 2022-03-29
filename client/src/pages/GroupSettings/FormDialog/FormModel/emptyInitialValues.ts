import formModel from './formModel';
const {
    formField: { name, desc, students, id, teacher },
} = formModel;


export const emptyInitialValues: { [p: string]: string | { label: string; value: number; }[] | undefined | number } = {
    [name.name]: '',
    [desc.name]: '',
    [students.name]: [],
    [teacher. name]: undefined,
    [id.name]: undefined
};
