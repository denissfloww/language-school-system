import {getValidationUserInfoForm} from "../../../pages/PersonalPage/UserInfoForm/FormModel/validationSchema";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../../interfaces/IUser";
import {ICreatedUser} from "../users/types";
import {RootState} from "../../store";

interface InitialState {
    validationSchema: any[];
}

const initialState: InitialState = {
    validationSchema: getValidationUserInfoForm(false)
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUserInfoValidation: (state, action: PayloadAction<any[]>) => {
            state.validationSchema = action.payload;
        },
    },
});

export const { setUserInfoValidation } = profileSlice.actions;

export const selectProfileState = (state: RootState) => state.profile;

export default profileSlice.reducer;