import formModel from './formModel';
const {
    formField: { name, description, lessonPrice },
} = formModel;

export const emptyInitialValues: { [p: string]: string | { label: string; value: number }[] | undefined | number } = {
    [name.name]: '',
    [description.name]: '',
    [lessonPrice.name]: undefined,
};
