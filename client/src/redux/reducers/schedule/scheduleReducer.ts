import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
import { IGroupForSchedule, ILessonTypeForSchedule } from '../../../interfaces/displayed/type';
import LessonTypesService from '../../../services/LessonTypesService';
import GroupsService from '../../../services/GroupsService';

interface InitialState {
    lessonTypes: ILessonTypeForSchedule[];
    groups: IGroupForSchedule[];
}

const initialState: InitialState = {
    lessonTypes: [],
    groups: [],
};

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        setScheduleLessonTypes: (state, action: PayloadAction<ILessonTypeForSchedule[]>) => {
            state.lessonTypes = action.payload;
        },
        setScheduleGroups: (state, action: PayloadAction<IGroupForSchedule[]>) => {
            state.groups = action.payload;
        },
    },
});

export const { setScheduleLessonTypes, setScheduleGroups } = scheduleSlice.actions;

export const fetchScheduleLessonTypes = (): AppThunk => {
    return async dispatch => {
        try {
            const lessonTypesData = await LessonTypesService.getLessonTypes();
            const lessonTypes: ILessonTypeForSchedule[] = lessonTypesData.data.map(value => {
                return { Id: value.id, Color: value.color, Name: value.name };
            });
            dispatch(setScheduleLessonTypes(lessonTypes));
        } catch (e) {
            console.log(e);
        }
    };
};

export const fetchScheduleGroups = (): AppThunk => {
    return async dispatch => {
        try {
            const groupsData = await GroupsService.getGroups();
            const groups: IGroupForSchedule[] = groupsData.data.map(value => {
                return {
                    Id: value.id,
                    Name: value.name,
                    TeacherName: `${value.teacher.firstName} ${value.teacher.middleName ? value.teacher.middleName + ' ' : ''}${
                        value.teacher.lastName
                    }`,
                };
            });
            dispatch(setScheduleGroups(groups));
        } catch (e) {
            console.log(e);
        }
    };
};

export const selectScheduleState = (state: RootState) => state.schedule;

export default scheduleSlice.reducer;
