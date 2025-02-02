import { createSlice } from '@reduxjs/toolkit';
// =============================================
import constants from '../../constants';
// =============================================
import restController from '../../api/rest/restController';
// =============================================
import { decorateAsyncThunk, rejectedReducer } from '../reduxUtils';

const initialState = {
  isFetching: true,
  data: null,
  error: null,
};

//---------- getDataForContest
export const getDataForContest = decorateAsyncThunk({
  key: `${constants.DATA_FOR_CONTEST_SLICE_NAME}/getDataForContest`,
  thunk: async (payload) => {
    const { data } = await restController.getDataForContest(payload);
    return data;
  },
});

const extraReducers = (builder) => {
  builder.addCase(getDataForContest.pending, (state) => {
    state.isFetching = true;
    state.data = null;
    state.error = null;
  });
  builder.addCase(getDataForContest.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.data = payload;
  });
  builder.addCase(getDataForContest.rejected, rejectedReducer);
};

const dataForContestSlice = createSlice({
  name: `${constants.DATA_FOR_CONTEST_SLICE_NAME}`,
  initialState,
  reducers: {},
  extraReducers,
});

const { reducer } = dataForContestSlice;

export default reducer;
