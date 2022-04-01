import formModel from './formModel';
const {
    formField: { name, description, color },
} = formModel;

export const emptyInitialValues: { [p: string]: string | { label: string; value: number }[] | undefined | number } = {
    [name.name]: '',
    [description.name]: '',
    [color.name]: '#000000',
};
