import formModel from './formModel';
const {
    formField: { name, description },
} = formModel;

export const emptyInitialValues: { [p: string]: string | { label: string; value: number }[] | undefined | number } = {
    [name.name]: '',
    [description.name]: '',
};
