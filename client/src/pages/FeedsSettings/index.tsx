import DashboardPage from '../../components/Pages/DashboardPage';
import Editor from './Editor';
import * as React from 'react';

const FeedsSettings = () => {
    return (
        <>
            <DashboardPage title='Управление объявлениями'>
                <Editor />
            </DashboardPage>
        </>
    );
};

export default FeedsSettings;
