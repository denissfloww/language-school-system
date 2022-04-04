import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUsersState } from '../../../redux/reducers/users/usersReducer';

const CheckoutSuccess = (props: { handleBack: () => void }) => {
    const { handleBack } = props;
    const { createdUser } = useSelector(selectUsersState);
    const c = document.createElement('a');
    c.download = `${createdUser?.firstName} ${createdUser?.lastName}.txt` ?? 'user-data.txt';

    const t = new Blob([`login: ${createdUser?.login}`, `\npassword: ${createdUser?.password}`], {
        type: 'text/plain',
    });
    c.href = window.URL.createObjectURL(t);

    const handleClick = () => {
        c.click();
    };

    return (
        <React.Fragment>
            {createdUser ? (
                <>
                    <Typography variant='h5' gutterBottom>
                        Пользователь успешно создан!
                    </Typography>
                    <Typography variant='h5' gutterBottom>
                        Логин <b>{createdUser.login}</b>
                    </Typography>
                    <Typography variant='h5' gutterBottom>
                        Пароль <b>{createdUser.password}</b>
                    </Typography>
                    <p>
                        <Button onClick={handleClick} variant='contained'>
                            Скачать данные
                        </Button>
                    </p>
                </>
            ) : (
                <>
                    <Typography variant='h5' gutterBottom>
                        Произошла ошибка
                    </Typography>

                    <p>
                        <Button variant='contained' onClick={handleBack}>
                            Попробовать заново
                        </Button>
                    </p>
                </>
            )}
        </React.Fragment>
    );
};

export default CheckoutSuccess;
