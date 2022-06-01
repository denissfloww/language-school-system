import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
import { IStudent } from '../../../interfaces/IStudent';
import StudentsService from '../../../services/StudentsService';

interface InitialState {
    students: IStudent[];
    isStudentsLoading: boolean;
}

const initialState: InitialState = {
    students: [],
    isStudentsLoading: false,
};

const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        setStudents: (state, action: PayloadAction<IStudent[]>) => {
            state.students = action.payload;
        },
        setStudentsDataGridLoading: (state, action: PayloadAction<boolean>) => {
            state.isStudentsLoading = action.payload;
        },
    },
});

export const { setStudents,setStudentsDataGridLoading } = studentsSlice.actions;

export const fetchStudents = (): AppThunk => {
    return async dispatch => {
        try {
            dispatch(setStudentsDataGridLoading(true))
            const students = await StudentsService.getStudents();
            dispatch(setStudents(students));
            dispatch(setStudentsDataGridLoading(false))
        } catch (e) {
            console.log(e);
        }
    };
};

export const selectStudentsState = (state: RootState) => state.students;

export default studentsSlice.reducer;
