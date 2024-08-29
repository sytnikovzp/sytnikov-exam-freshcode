import { createSlice } from '@reduxjs/toolkit';
// =============================================
import CONSTANTS from '../../constants';

const initialState = {
  bundle: null,
};

const reducers = {
  updateBundle: (state, { payload }) => {
    state.bundle = payload;
  },
};

const bundleSlice = createSlice({
  name: `${CONSTANTS.BUNDLE_SLICE_NAME}`,
  initialState,
  reducers,
});

const { actions, reducer } = bundleSlice;

export const { updateBundle } = actions;

export default reducer;
