import { FormHelperText, MenuItem, Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import { useField } from 'formik';
import { at } from 'lodash';

const SelectField = (props: any) => {
    const { label, data, ...rest } = props;
    const [field, meta] = useField(props);
    const { value: selectedValue } = field;
    const [touched, error] = at(meta, 'touched', 'error');
    const isError = touched && error && true;
    function _renderHelperText() {
        if (isError) {
            return <FormHelperText>{error}</FormHelperText>;
        }
    }

    return (
        <FormControl {...rest} error={isError}>
            <InputLabel>{label}</InputLabel>
            <Select label={label} {...field} value={selectedValue ? selectedValue : ''}>
                {data.map((item: any, index: any) => (
                    <MenuItem key={index} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
            {_renderHelperText()}
        </FormControl>
    );
};

export default SelectField;
