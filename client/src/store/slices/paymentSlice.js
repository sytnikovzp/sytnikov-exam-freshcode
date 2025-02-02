import { createSlice } from '@reduxjs/toolkit';
// =============================================
import constants from '../../constants';
// =============================================
import restController from '../../api/rest/restController';
// =============================================
import { clearContestStore } from './contestCreationSlice';
import { changeProfileViewMode } from './userProfileSlice';
import { updateUser } from './userSlice';
// =============================================
import {
  decorateAsyncThunk,
  pendingReducer,
  rejectedReducer,
} from '../reduxUtils';

const initialState = {
  isFetching: false,
  error: null,
  focusOnElement: 'number',
};

//---------- pay
export const pay = decorateAsyncThunk({
  key: `${constants.PAYMENT_SLICE_NAME}/pay`,
  thunk: async ({ data, navigate }, { dispatch }) => {
    await restController.payMent(data);
    navigate('/dashboard', { replace: true });
    dispatch(clearContestStore());
  },
});

//---------- cashOut
export const cashOut = decorateAsyncThunk({
  key: `${constants.PAYMENT_SLICE_NAME}/cashOut`,
  thunk: async (payload, { dispatch }) => {
    const { data } = await restController.cashOut(payload);
    dispatch(updateUser.fulfilled(data));
    dispatch(changeProfileViewMode(constants.UI_MODES.USER_INFO));
  },
});

const reducers = {
  changeFocusOnCard: (state, { payload }) => {
    state.focusOnElement = payload;
  },
  clearPaymentStore: () => initialState,
};

const extraReducers = (builder) => {
  builder.addCase(pay.pending, pendingReducer);
  builder.addCase(pay.fulfilled, () => initialState);
  builder.addCase(pay.rejected, rejectedReducer);

  builder.addCase(cashOut.pending, pendingReducer);
  builder.addCase(cashOut.fulfilled, () => initialState);
  builder.addCase(cashOut.rejected, rejectedReducer);
};

const paymentSlice = createSlice({
  name: constants.PAYMENT_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = paymentSlice;

export const { changeFocusOnCard, clearPaymentStore } = actions;

export default reducer;
