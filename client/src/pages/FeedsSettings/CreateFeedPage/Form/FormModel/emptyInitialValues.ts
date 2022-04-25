import formModel from './formModel';
const {
    formField: { name, description },
} = formModel;

export const emptyInitialValues: { [p: string]: string | number } = {
    [name.name]: '',
    [description.name]: '',
};
