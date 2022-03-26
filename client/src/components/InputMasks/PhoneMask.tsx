import NumberFormat from 'react-number-format';
import * as React from 'react';

interface NumberFormatCustomProps {
    // @ts-ignore
    inputRef: (instance: NumberFormat | null) => void;
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

function PhoneMask(props: NumberFormatCustomProps) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values: any) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            format='+7 (###) ###-####'
            mask='_'
            allowEmptyFormatting={true}
        />
    );
}

export default PhoneMask;
