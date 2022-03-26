import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import { fieldToTextField } from 'formik-mui';

const AutocompleteField = ({ textFieldProps, options, ...props }: any) => {
    const {
        form: { setTouched, setFieldValue },
    } = props;
    const { error, helperText, ...field } = fieldToTextField(props);
    const { name } = field;

    return (
        <Autocomplete
            {...props}
            {...field}
            options={options}
            onChange={(_, value) => setFieldValue(name, value)}
            getOptionLabel={(option: any) => option.label}
            getOptionSelected={(item: any, current: any) => item.value === current.value}
            renderInput={props => <TextField {...textFieldProps} {...props} helperText={helperText} error={error} />}
        />
    );
};

export default AutocompleteField;
