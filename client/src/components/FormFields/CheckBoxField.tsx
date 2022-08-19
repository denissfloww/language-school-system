import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import { useField } from 'formik';
import { at } from 'lodash';

const CheckBoxField = (props: any) => {
    const { label, ...rest } = props;
    const [field, meta, helper] = useField(props);
    const { setValue } = helper;
    const [touched, error] = at(meta, 'touched', 'error');
    const isError = error && touched && true;
    function __renderHelperText() {
        if (isError) {
            return <FormHelperText>{error}</FormHelperText>;
        }
    }
    function _onChange(event: any) {
        setValue(event.target.checked);
    }

    const configFormControl = {
        ...field,
        ...rest,
        onChange: _onChange,
    };

    return (
        <FormControl component='fieldset' {...configFormControl} error={Boolean(isError)}>
            <FormControlLabel
                // value={field.checked}
                checked={field.checked}
                label={label}
                onChange={_onChange}
                control={<Checkbox {...configFormControl} checked={field.value} color='primary' />}
                color='primary'
            />
            {__renderHelperText()}
        </FormControl>
    );
};

export default CheckBoxField;
