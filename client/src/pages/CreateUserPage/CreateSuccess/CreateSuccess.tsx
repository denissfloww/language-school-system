import { Button, Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUsersState } from '../../../redux/reducers/users/usersReducer';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CheckoutSuccess = (props: { handleBack: () => void }) => {
    const { handleBack } = props;
    const { createdUser, isLoading } = useSelector(selectUsersState);

    return (
        <React.Fragment>
            {!isLoading ? (
                <>
                    {createdUser ? (
                        <>
                            <Typography variant='h5' gutterBottom>
                                Пользователь успешно создан!
                            </Typography>
                            <Link href={createdUser.creditionalsNoteLink} target='_blank'>
                                Данные для входа
                            </Link>
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
                </>
            ) : (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            )}
        </React.Fragment>
    );
};

export default CheckoutSuccess;
