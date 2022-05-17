import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
import { IStudent } from '../../../interfaces/IStudent';
import StudentsService from '../../../services/StudentsService';

interface InitialState {
    students: IStudent[];
}

const initialState: InitialState = {
    students: [],
};

const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        setStudents: (state, action: PayloadAction<IStudent[]>) => {
            state.students = action.payload;
        },
    },
});

export const { setStudents } = studentsSlice.actions;

export const fetchStudents = (): AppThunk => {
    return async dispatch => {
        try {
            const students = await StudentsService.getStudents();
            dispatch(setStudents(students));
        } catch (e) {
            console.log(e);
        }
    };
};

export const selectStudentsState = (state: RootState) => state.students;

export default studentsSlice.reducer;
