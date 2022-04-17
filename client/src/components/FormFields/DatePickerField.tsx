import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';
import * as React from 'react';
import { useField, useFormikContext } from 'formik';
import { at } from 'lodash';

const DatePickerField = (props: any) => {
    const [field, meta] = useField(props);
    const { setFieldValue } = useFormikContext();
    const { value: dateValue } = field;

    function _renderHelperText() {
        const [touched, error] = at(meta, 'touched', 'error');
        if (touched && error) {
            return error;
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePickerField
                onChange={(value: any) => setFieldValue(field.name, value)}
                inputFormat='dd.MM.yyyy'
                value={dateValue}
                renderInput={(params: any) => <TextField {...params} {...field} helperText={_renderHelperText()} />}
            />
        </LocalizationProvider>
    );
};

export default DatePickerField;
