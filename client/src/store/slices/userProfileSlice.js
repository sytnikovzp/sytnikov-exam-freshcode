import { createSlice } from '@reduxjs/toolkit';
// =============================================
import constants from '../../constants';

const initialState = {
  profileViewMode: constants.UI_MODES.USER_INFO,
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
  name: constants.USER_PROFILE_SLICE_NAME,
  initialState,
  reducers,
});

const { actions, reducer } = userProfileSlice;

export const { changeProfileViewMode, changeEditModeOnUserProfile } = actions;

export default reducer;
