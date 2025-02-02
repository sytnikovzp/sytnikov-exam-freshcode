import { createSlice } from '@reduxjs/toolkit';
// =============================================
import constants from '../../constants';
// =============================================
import restController from '../../api/rest/restController';
// =============================================
import { updateStoreAfterUpdateContest } from './contestByIdSlice';
// =============================================
import {
  decorateAsyncThunk,
  pendingReducer,
  fulfilledReducer,
  rejectedReducer,
} from '../reduxUtils';

const initialState = {
  isFetching: true,
  error: null,
};

//---------- updateContest
export const updateContest = decorateAsyncThunk({
  key: constants.CONTEST_UPDATION_SLICE_NAME,
  thunk: async (payload, { dispatch }) => {
    const { data } = await restController.updateContest(payload);
    dispatch(updateStoreAfterUpdateContest(data));
  },
});

const reducers = {
  clearContestUpdationStore: () => initialState,
};

const extraReducers = (builder) => {
  builder.addCase(updateContest.pending, pendingReducer);
  builder.addCase(updateContest.fulfilled, fulfilledReducer);
  builder.addCase(updateContest.rejected, rejectedReducer);
};

const contestUpdationSlice = createSlice({
  name: constants.CONTEST_UPDATION_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = contestUpdationSlice;

export const { clearContestUpdationStore } = actions;

export default reducer;
