import { createSlice } from '@reduxjs/toolkit';
// =============================================
import constants from '../../constants';
// =============================================
import restController from '../../api/rest/restController';
// =============================================
import { decorateAsyncThunk, pendingReducer } from '../reduxUtils';

const initialState = {
  isFetching: true,
  error: null,
  contests: [],
  customerFilter: constants.CONTEST_STATUS.ACTIVE,
  creatorFilter: {
    typeIndex: 1,
    contestId: '',
    industry: '',
    awardSort: 'asc',
    ownEntries: false,
  },
  haveMore: true,
};

//---------- getAllContests
export const getAllContests = decorateAsyncThunk({
  key: `${constants.CONTESTS_SLICE_NAME}/getAllContests`,
  thunk: async ({ requestData, role }) => {
    const { data } =
      role === constants.USER_ROLES.CUSTOMER
        ? await restController.getCustomersContests(requestData)
        : await restController.getAllContests(requestData);
    return data;
  },
});

const reducers = {
  clearContestsList: (state) => {
    state.error = null;
    state.contests = [];
  },
  setNewCustomerFilter: (state, { payload }) => ({
    ...initialState,
    isFetching: false,
    customerFilter: payload,
  }),
  setNewCreatorFilter: (state, { payload }) => ({
    ...initialState,
    isFetching: false,
    creatorFilter: { ...state.creatorFilter, ...payload },
  }),
};

const extraReducers = (builder) => {
  builder.addCase(getAllContests.pending, pendingReducer);
  builder.addCase(getAllContests.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.contests = [...state.contests, ...payload.contests];
    state.haveMore = payload.haveMore;
  });
  builder.addCase(getAllContests.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.error = payload;
    state.contests = [];
  });
};

const contestsSlice = createSlice({
  name: constants.CONTESTS_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = contestsSlice;

export const { clearContestsList, setNewCustomerFilter, setNewCreatorFilter } =
  actions;

export default reducer;
