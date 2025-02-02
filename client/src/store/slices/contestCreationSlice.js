import { createSlice } from '@reduxjs/toolkit';
// =============================================
import constants from '../../constants';

const initialState = {
  contests: {},
};

const reducers = {
  saveContestToStore: (state, { payload: { type, info } }) => {
    state.contests = {
      ...state.contests,
      [type]: info,
    };
  },
  clearContestStore: () => initialState,
};

const contestSavingSlice = createSlice({
  name: constants.CONTEST_CREATION_SLICE_NAME,
  initialState,
  reducers,
});

const { actions, reducer } = contestSavingSlice;

export const { saveContestToStore, clearContestStore } = actions;

export default reducer;
