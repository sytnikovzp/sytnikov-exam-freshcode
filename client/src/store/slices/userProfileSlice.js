import { createSlice } from '@reduxjs/toolkit';
// =============================================
import CONSTANTS from '../../constants';

const initialState = {
  profileViewMode: CONSTANTS.UI_MODES.USER_INFO,
  isEdit: false,
};

const reducers = {
  changeProfileViewMode: (state, { payload }) => {
    state.profileViewMode = payload;
  },
  changeEditModeOnUserProfile: (state, { payload }) => {
    state.isEdit = payload;
  },
};

const userProfileSlice = createSlice({
  name: CONSTANTS.USER_PROFILE_SLICE_NAME,
  initialState,
  reducers,
});

const { actions, reducer } = userProfileSlice;

export const { changeProfileViewMode, changeEditModeOnUserProfile } = actions;

export default reducer;
